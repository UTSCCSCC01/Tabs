import * as Notifications from 'expo-notifications';



export async function rentScheduleNotification(dateStr: String): Promise<String> {
    console.log("schedule rent for" + dateStr)
    // convert it into the seconds
    const date = dateStr.split('-')
    const expiry_time = Date.UTC( Number(date[0]), Number(date[1]),Number(date[2]),Number(date[3]),Number(date[4]),Number(date[5]),Number(date[6])) - Date.now()
    const notifId = await Notifications.scheduleNotificationAsync({
       content: {
         title: "RENT DUE SOON!!!!!",
         body: 'we have an issue'

       },
       trigger: { seconds: 3},
     });
   return notifId
}

export async function foodExpiryScheduleNotification(dateStr: String): Promise<String> {
    console.log("schedule rent for" + dateStr)
    // convert it into the seconds
    const date = dateStr.split('-')
    const expiry_time = Date.UTC( Number(date[0]), Number(date[1]),Number(date[2]),Number(date[3]),Number(date[4]),Number(date[5]),Number(date[6])) - Date.now()
    const notifId = await Notifications.scheduleNotificationAsync({
       content: {
         title: "food expiring soon",
         body: 'do something about it'

       },
       trigger: { seconds: 3},
     });
   return notifId
}
