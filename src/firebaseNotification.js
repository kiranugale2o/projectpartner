// firebaseNotification.js
import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    const fcmToken = await messaging().getToken();
    console.log("FCM Token:", fcmToken);
    // Save token to your backend if needed
  }
}
