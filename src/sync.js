console.log('SYNC SCRIPT: Script is starting (before imports)');

try {
  const { getBufferedPrayerEvents } = require('./prayer-times');
  const { upsertEvent } = require('./calendar');
  const config = require('./config');
  console.log('SYNC SCRIPT: Imports and config loaded:', config);

  async function main() {
    try {
      console.log('Fetching prayer times and applying buffers...');
      const events = await getBufferedPrayerEvents();
      console.log(`Found ${events.length} prayer events:`, events);

      for (const event of events) {
        const summary = `${event.prayer} Prayer`;
        const description = 'Prayer time, please avoid scheduling meetings.';
        const colorId = '11'; // Optional: blue
        const uid = `${event.prayer}_${event.start.split('T')[0]}`;
        const eventData = {
          summary,
          description,
          start: event.start,
          end: event.end,
          colorId,
          uid,
        };
        console.log('Upserting event:', eventData);
        try {
          const result = await upsertEvent(eventData);
          console.log(`${result.created ? 'Created' : 'Updated'}: ${summary} (${event.start} - ${event.end})`);
        } catch (err) {
          console.error(`Failed to upsert event for ${summary}:`, err.stack || err);
        }
      }
      console.log('Sync complete.');
    } catch (err) {
      console.error('Sync failed:', err.stack || err);
      process.exit(1);
    }
  }

  main();
} catch (importErr) {
  console.error('SYNC SCRIPT: Error during imports or config:', importErr.stack || importErr);
  process.exit(1);
} 