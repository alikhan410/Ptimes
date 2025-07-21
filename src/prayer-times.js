const axios = require('axios');
const config = require('./config');

async function fetchPrayerTimes(date = new Date()) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const url = `https://api.aladhan.com/v1/timingsByCity?city=${config.city}&country=${config.country}&method=2&date=${dd}-${mm}-${yyyy}`;
  const { data } = await axios.get(url);
  return data.data.timings;
}

function applyBuffers(prayerTimes, date) {
  const events = [];
  for (const [prayer, time] of Object.entries(prayerTimes)) {
    if (!config.buffers[prayer]) continue;
    const [hour, minute] = time.split(':').map(Number);
    const start = new Date(date);
    start.setHours(hour, minute, 0, 0);
    const end = new Date(start);
    // Apply buffers
    start.setMinutes(start.getMinutes() - config.buffers[prayer].before);
    end.setMinutes(end.getMinutes() + config.buffers[prayer].before + config.buffers[prayer].after);
    events.push({
      prayer,
      start: start.toISOString(),
      end: end.toISOString(),
    });
  }
  return events;
}

async function getBufferedPrayerEvents(date = new Date()) {
  const prayerTimes = await fetchPrayerTimes(date);
  return applyBuffers(prayerTimes, date);
}

module.exports = { getBufferedPrayerEvents }; 