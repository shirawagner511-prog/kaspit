import cron from 'node-cron';
import { getUsersForReminder } from './firestore.js';
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
  return `${hour}:${minute}`;
}

export function startReminderCron() {
  cron.schedule('* * * * *', async () => {
    const time = getIsraelTime();
    try {
      const users = await getUsersForReminder(time);
      for (const u of users) {
        if (!u.fcmToken) continue;
        await sendPush(u.fcmToken, {
          title: 'Budgi 📊',
          body: 'זמן לתעד את ההוצאות של היום!',
        }).catch((e) => console.error(`Push failed uid=${u.uid}:`, e.message));
      }
      if (users.length > 0) console.log(`Reminders sent: ${users.length} @ ${time}`);
    } catch (e) {
      console.error('Cron reminder error:', e.message);
    }
  });
  console.log('Reminder cron started');
}
