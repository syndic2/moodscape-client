// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const urls= {
  baseUrl: {
    development: 'http://localhost:8100',
    production: 'https://moodscape.netlify.app'
  },
  apiUrl: {
    development: 'http://127.0.0.1:5000/api',
    production: 'https://moodscape-api.herokuapp.com/api'
  }
};

export const environment = {
  production: false,
  baseUrl: urls.baseUrl.development,
  apiUrl: urls.apiUrl.development
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
