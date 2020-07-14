import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('LOCAL NOTIFICATION ==>', notification);
  },
  popInitialNotification: true,
  requestPermissions: true,
});

export const LocalNotification = (bigText, subText, title, message) => {
  PushNotification.localNotification({
    autoCancel: true,
    bigText: bigText,
    subText: subText,
    title: title,
    message: message,
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    actions: '["Yes", "No"]',
  });
};
