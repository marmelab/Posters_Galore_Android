# Posters Galore for Android
An experimental Android application for easily buy posters, built with react-native, using a REST API and redux.

![Posters Galore Example](http://image.noelshack.com/fichiers/2015/47/1447954279-posters-galore-example.png)

## Dependencies

- If you are not used to Android SDK, follow the [React Native Android Setup Guide](https://facebook.github.io/react-native/docs/android-setup.html)

- For JS dependencies, just run :

```bash
make install
```

## Run the application

- Install [Genymotion](https://www.genymotion.com/) (or an other android emulator) and run a virtual android phone

- If it's the first time you launch the app, you should run `node node_modules/react-native/local-cli/cli.js android` (do not overwrite `.gitignore` and `index.android.js`)

- Run the following command :

```bash
make run
```

## Unit tests

```bash
make test
```
