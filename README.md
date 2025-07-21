# Prayer Times Google Calendar Sync

Automatically sync daily or weekly prayer times (with custom buffers) into a Google Calendar, shared with a colleague.

## Setup

1. Clone the repo and install dependencies:
   ```sh
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your credentials and config.
3. Set up your Google Cloud project and enable the Calendar API.
4. Share your Google Calendar with your colleague and get the calendar ID.

## Usage

- Run the sync script manually:
  ```sh
  node src/sync.js
  ```
- Or schedule it using Vercel Cron, GitHub Actions, or a system cron job.

## Security

- **Never commit secrets**. Use environment variables for all sensitive data.
- See `plan/checklist.md` for a full checklist and security best practices.

## Project Structure

- `src/prayer-times.js` – Fetch timings & apply buffers
- `src/calendar.js` – Google Calendar API functions
- `src/config.js` – Config loader
- `src/sync.js` – Main sync script

---

See `plan/checklist.md` for full requirements and best practices.
