const { google } = require('googleapis');
const config = require('./config');

function getOAuth2Client() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
    throw new Error('Missing Google OAuth2 credentials in environment variables');
  }
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
  );
}

function getServiceAccountClient() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    throw new Error('Missing GOOGLE_SERVICE_ACCOUNT_JSON in environment variables');
  }

  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
}

async function getCalendarClient() {
  let auth;
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    auth = await getServiceAccountClient().getClient();
  } else {
    auth = getOAuth2Client();
  }
  return google.calendar({ version: 'v3', auth });
}

async function upsertEvent({ summary, description, start, end, colorId, uid }) {
  const calendar = await getCalendarClient();
  const calendarId = config.calendarId;
  if (!calendarId) throw new Error('Missing calendar ID');

  const uniqueKey = uid || `${summary}_${start.split('T')[0]}`;

  const { data } = await calendar.events.list({
    calendarId,
    privateExtendedProperty: `uid=${uniqueKey}`,
    timeMin: start,
    timeMax: end,
    singleEvents: true,
    maxResults: 1,
  });

  const event = {
    summary,
    description,
    start: { dateTime: start, timeZone: config.timezone },
    end: { dateTime: end, timeZone: config.timezone },
    colorId,
    extendedProperties: { private: { uid: uniqueKey } },
  };

  if (data.items && data.items.length > 0) {
    await calendar.events.update({
      calendarId,
      eventId: data.items[0].id,
      requestBody: event,
    });
    return { updated: true };
  } else {
    await calendar.events.insert({
      calendarId,
      requestBody: event,
    });
    return { created: true };
  }
}

module.exports = { upsertEvent };
