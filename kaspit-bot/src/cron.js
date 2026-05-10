import cron from 'node-cron';
import { getUsersForReminder, clearFcmToken } from './firestore.js';
import { sendPush } from './notify.js';
import { sendReply } from './whatsapp.js';

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
        const promises = [];

        if (u.fcmToken) {
          promises.push(
            sendPush(u.fcmToken, { title: 'Budgi', body: 'זמן לתעד את ההוצאות של היום!' })
              .then(() => console.log(`Push sent to uid=${u.uid}`))
              .catch(async (e) => {
                console.error(`Push failed uid=${u.uid}:`, e.message);
                if (e.message.includes('UNREGISTERED') || e.message.includes('invalid') || e.message.includes('NOT_FOUND')) {
                  await clearFcmToken(u.uid).catch(() => {});
                  console.log(`Cleared stale token for uid=${u.uid}`);
                }
              })
          );
        } else {
          console.log(`No FCM token for uid=${u.uid}, skipping push`);
        }

        if (u.whatsappNumber) {
          const to = u.whatsappNumber.startsWith('whatsapp:') ? u.whatsappNumber : `whatsapp:${u.whatsappNumber}`;
          promises.push(
            sendReply(to, 'Budgi 📊 זמן לתעד את ההוצאות של היום!')
              .then(() => console.log(`WhatsApp reminder sent to uid=${u.uid}`))
              .catch((e) => console.error(`WhatsApp reminder failed uid=${u.uid}:`, e.message))
          );
        }

        await Promise.all(promises);
      }
      if (users.length > 0) console.log(`Reminders processed: ${users.length} @ ${time}`);
    } catch (e) {
      console.error('Cron reminder error:', e.message);
    }
  });
  console.log('Reminder cron started');
}
