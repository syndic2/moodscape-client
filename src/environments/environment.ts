// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const urls = {
  baseUrl: {
    development: 'http://192.168.100.106:8100',
    production: 'https://moodscape.netlify.app',
  },
  apiUrl: {
    development: 'http://127.0.0.1:5000/api',
    production: 'https://moodscape-api.herokuapp.com/api',
  },
  rasaChatbot: {
    development: 'http://localhost:5005',
    production: 'https://rasa-server-syndic2.cloud.okteto.net'
  }
};

export const environment = {
  production: false,
  baseUrl: urls.baseUrl.production,
  apiUrl: urls.apiUrl.development,
  rasaChatbot: urls.rasaChatbot.production,
  firebase: {
    apiKey: "AIzaSyAYw7kXkEwuF1oipBkzWUAnVEr0GK-8_H8",
    authDomain: "moodscape-app.firebaseapp.com",
    projectId: "moodscape-app",
    storageBucket: "moodscape-app.appspot.com",
    messagingSenderId: "253594452296",
    appId: "1:253594452296:web:f51ad7b6c5fb998718337d"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
