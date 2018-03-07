// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAzNMbQDmvlou9WjKete7RWf98bJd48UUA',
    authDomain: 'ng-swimming-tracker.firebaseapp.com',
    databaseURL: 'https://ng-swimming-tracker.firebaseio.com',
    projectId: 'ng-swimming-tracker',
    storageBucket: 'ng-swimming-tracker.appspot.com',
    messagingSenderId: '278508114616'
  }
};
