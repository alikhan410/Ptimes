## ✅ Project Checklist

### 1. **API Access & Keys**

- [ ] **Google Cloud Project**: Create a project in Google Cloud Console.
- [ ] **Enable Google Calendar API** for your project.
- [ ] **Create OAuth2 Credentials** (OAuth Client ID) for server-to-server access (service account or OAuth2 client).
  - Download the `credentials.json` file.
- [ ] **AlAdhan API**: No API key required (public API).

### 2. **Calendar Setup**

- [ ] **Create a new Google Calendar** named "Prayer Times".
- [ ] **Share the calendar** with Matt (colleague) with "See all event details" permission.
- [ ] **Get the Calendar ID** (from calendar settings).

### 3. **Development**

- [ ] **Fetch prayer times** from AlAdhan API for Karachi.
- [ ] **Apply custom buffers** to each prayer time.
- [ ] **Convert times to ISO 8601** (with Karachi timezone).
- [ ] **Insert/update events** in Google Calendar using the API.
- [ ] **Ensure events are timezone-aware** (Karachi for source, Google Calendar will auto-adjust for Matt).
- [ ] **No notifications or invites** sent to Matt.

### 4. **Automation**

- [ ] **Set up a scheduler**:
  - Vercel Cron Jobs, GitHub Actions, or a simple OS cron job.
- [ ] (Optional) **Expose a manual trigger endpoint** (e.g., `/api/sync-prayer-times`).

### 5. **Deployment**

- [ ] **Deploy to Vercel, Render, or any Node.js host**.
- [ ] **Store credentials securely** (use environment variables or secret files).

---

## 🔑 API Keys & Credentials Needed

- **Google Calendar API OAuth2 Credentials** (from Google Cloud Console)

  - `credentials.json` (or environment variables for client ID/secret)
  - If using a service account, share the calendar with the service account email.

- **AlAdhan API**: No key required.

---

## 💡 Suggestions & Improvements

### Tech Stack Alternatives

- **Next.js** is great if you want a web dashboard or UI, but for a backend-only sync, it may be overkill.
- **Alternatives:**
  - **Node.js Script**: A simple Node.js script (run via cron, GitHub Actions, or Vercel serverless function) is sufficient.
  - **Google Apps Script**: Can run on a schedule, natively integrates with Google Calendar, and is free.
  - **Python Script**: Use `google-api-python-client` and `requests` for a lightweight solution.
  - **Serverless Function**: AWS Lambda, Vercel, or Netlify Functions.

### Improvements

- **Error Handling & Logging**: Add logging for failed API calls or calendar updates.
- **Idempotency**: Ensure events are updated, not duplicated, by using a unique ID or summary per event.
- **Config File**: Store city, buffer times, and calendar ID in a config file or environment variables.
- **Testing**: Add a dry-run mode to preview changes before updating the calendar.

---

## 🛠️ Example Minimal Tech Stack

- **Node.js** (plain, no Next.js)
  - `googleapis` (Google Calendar API)
  - `node-fetch` or `axios` (for AlAdhan API)
  - `cron` (for scheduling, or use GitHub Actions/Vercel Cron)
- **Config**: `.env` for credentials and settings

---

Let me know if you want a sample folder structure or code starter for a minimal Node.js implementation!
