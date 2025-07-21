import { getBufferedPrayerEvents } from '../src/prayer-times.js';
import { upsertEvent } from '../src/calendar.js';

export default async function handler(req, res) {
  try {
    const events = await getBufferedPrayerEvents();
    let results = [];
    for (const event of events) {
      const summary = `${event.prayer} Prayer`;
      const description = 'Prayer time, please avoid scheduling meetings.';
      const colorId = '11';
      const uid = `${event.prayer}_${event.start.split('T')[0]}`;
      const result = await upsertEvent({ summary, description, start: event.start, end: event.end, colorId, uid });
      results.push({ summary, ...result });
    }
    res.status(200).json({ status: 'success', events: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
} 