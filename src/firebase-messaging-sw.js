importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyAYw7kXkEwuF1oipBkzWUAnVEr0GK-8_H8",
  authDomain: "moodscape-app.firebaseapp.com",
  projectId: "moodscape-app",
  storageBucket: "moodscape-app.appspot.com",
  messagingSenderId: "253594452296",
  appId: "1:253594452296:web:f51ad7b6c5fb998718337d"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
  //Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/assets/icons/icon-72x72.png'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
