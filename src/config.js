// Loads config from environment variables
require('dotenv').config();

const config = {
  city: process.env.CITY || 'Karachi',
  country: process.env.COUNTRY || 'Pakistan',
  timezone: process.env.TIMEZONE || 'Asia/Karachi',
  calendarId: process.env.GOOGLE_CALENDAR_ID,
  buffers: process.env.BUFFERS ? JSON.parse(process.env.BUFFERS) : {
    Fajr: { before: 10, after: 15 },
    Dhuhr: { before: 5, after: 30 },
    Asr: { before: 5, after: 20 },
    Maghrib: { before: 5, after: 30 },
    Isha: { before: 5, after: 30 },
  },
};

module.exports = config; 