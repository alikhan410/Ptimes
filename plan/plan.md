# 🕌 **Prayer Times Google Calendar Integration - Technical Spec**

---

## **Goal**

Automatically sync daily or weekly **prayer times with custom buffers** into a **Google Calendar**. This calendar is shared with one colleague to inform them when I am unavailable.

---

## **Functionality Breakdown**

### **1️⃣ Fetch Prayer Times**

- Use the **AlAdhan API** to fetch daily or weekly prayer timings for **Karachi**.
- Example API request:

```http
GET https://api.aladhan.com/v1/timingsByCity?city=Karachi&country=Pakistan&method=2
```

- Retrieve timings for: **Fajr, Dhuhr, Asr, Maghrib, Isha**.

---

### **2️⃣ Apply Custom Buffers**

For each prayer, add buffers to the start and end times:

| Prayer  | Buffer Before | Buffer After |
| ------- | ------------- | ------------ |
| Fajr    | 10 min        | 15 min       |
| Dhuhr   | 5 min         | 30 min       |
| Asr     | 5 min         | 20 min       |
| Maghrib | 5 min         | 30 min       |
| Isha    | 5 min         | 30 min       |

Convert to ISO 8601 timestamps for Google Calendar API.

---

### **3️⃣ Update Google Calendar**

- Use **Google Calendar API** to insert or update events.
- Events should appear in a dedicated calendar named: **"Prayer Times"**.
- Calendar is shared with a colleague (Matt) with **"See all event details"** permission.

**Event Format Example:**

```json
{
  "summary": "Dhuhr Prayer",
  "description": "Prayer time, please avoid scheduling meetings.",
  "start": { "dateTime": "2025-07-22T13:10:00+05:00" },
  "end": { "dateTime": "2025-07-22T13:35:00+05:00" },
  "colorId": "11"
}
```

---

## **Behavior**

- **Timezone aware**: Karachi for source times; Google Calendar auto-adjusts for Matt’s timezone (Colorado).
- **No notifications**: Calendar events only, no invites, no notifications.
- **Silent updates**: Existing events updated cleanly.

---

## **Automation**

- **Scheduled via**: Vercel Cron Jobs, or GitHub Actions (daily or weekly).
- Optional: Expose manual trigger as `/api/sync-prayer-times` in Next.js.

---

## **Technologies / Stack**

| Technology                  | Purpose                              |
| --------------------------- | ------------------------------------ |
| **Next.js API Route**       | API logic (serverless, Vercel ready) |
| **Google Calendar API**     | Create/update calendar events        |
| **AlAdhan API**             | Fetch prayer times                   |
| **OAuth2**                  | Google Calendar Access               |
| **Vercel / GitHub Actions** | Automation scheduler                 |

---

## **Project Structure Example**

```
/pages/api/sync-prayer-times.js   <-- Trigger sync manually
/lib/calendar.js                  <-- Google Calendar API functions
/lib/prayer-times.js               <-- Fetch timings & apply buffers
/utils/config.js                   <-- Config for city, buffers, calendar ID
/vercel.json                       <-- Cron Job schedule
```

---

## **Expected Output for User**

**Matt’s Calendar (Colorado timezone) Example:**

| Time (His TZ)      | Event Title    |
| ------------------ | -------------- |
| 3:50 AM - 4:30 AM  | Fajr Prayer    |
| 1:05 PM - 1:40 PM  | Dhuhr Prayer   |
| 5:10 PM - 5:45 PM  | Asr Prayer     |
| 8:15 PM - 8:50 PM  | Maghrib Prayer |
| 9:30 PM - 10:05 PM | Isha Prayer    |

---

## **Optional Future Enhancements**

- Web dashboard for custom buffer adjustments.
- Slack / email notifications for yourself (not Matt).
- Multi-city / multi-user support.

---

## **What This App **Does NOT** Do**

🚫 No notifications to Matt.
🚫 No meeting invites.
🚫 No user auth (only built for me).
🚫 No mobile app.

---
