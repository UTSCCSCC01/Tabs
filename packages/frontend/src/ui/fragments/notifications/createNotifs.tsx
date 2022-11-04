import * as Notifications from 'expo-notifications';



export async function createExpiryNotification(dateStr: string, message: string, title:string): Promise<String> {
    console.log("schedule rent for" + dateStr)
    const date = new Date(dateStr)
    const expiry_time = date.getTime() - Date.now()
    const notifId = await Notifications.scheduleNotificationAsync({
       content: {
         title: title,
         body: message

       },
       trigger: { seconds: expiry_time},
     });
   return notifId
}

