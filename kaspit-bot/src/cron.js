import cron from 'node-cron';
import { getUsersForReminder, clearFcmToken } from './firestore.js';
import { sendPush } from './notify.js';

function getIsraelTime() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Jerusalem',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());
  const hour = parts.find((p) => p.type === 'hour').value;
  const minute = parts.find((p) => p.type === 'minute').value;
  const h = hour === '24' ? '00' : hour;
  return `${h}:${minute}`;
}

export function startReminderCron() {
  cron.schedule('* * * * *', async () => {
    const time = getIsraelTime();
    try {
      const users = await getUsersForReminder(time);
      for (const u of users) {
        if (!u.fcmToken) { console.log(`No FCM token for uid=${u.uid}, skipping`); continue; }
        try {
          await sendPush(u.fcmToken, {
            title: 'Budgi 📊',
            body: 'זמן לתעד את ההוצאות של היום!',
          });
          console.log(`Push sent to uid=${u.uid}`);
        } catch (e) {
          console.error(`Push failed uid=${u.uid}:`, e.message);
          if (e.message.includes('UNREGISTERED') || e.message.includes('invalid') || e.message.includes('NOT_FOUND')) {
            await clearFcmToken(u.uid).catch(() => {});
            console.log(`Cleared stale token for uid=${u.uid}`);
          }
        }
      }
      if (users.length > 0) console.log(`Reminders sent: ${users.length} @ ${time}`);
    } catch (e) {
      console.error('Cron reminder error:', e.message);
    }
  });
  console.log('Reminder cron started');
}
