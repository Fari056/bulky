import messaging from "@react-native-firebase/messaging";
import Toast from "react-native-toast-message";
export async function request_Permission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("FCM Permission granted:", authStatus);
  }
}
export async function getToken() {
  const token = await messaging().getToken();
  return token;
}
export function foreground_Listener() {
  return messaging().onMessage(async (remoteMessage) => {
    console.log("Foreground Message:", remoteMessage);
    Toast.show({
      type: "info",
      text1: remoteMessage.notification?.title,
      text2: remoteMessage.notification?.body,
    });
  });
}

export function background_Listener() {
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Background Message:", remoteMessage);
  });
}
export async function Notification() {
  const remoteMessage = await messaging().getInitialNotification();
  if (remoteMessage) {
    console.log(
      "Notification caused app to open from killed state:",
      remoteMessage
    );
  }
}
