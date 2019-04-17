<table>
        <tr>
            <td><img width="60" src="https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/svg/beaker.svg" alt="hackday" /></td>
            <td><strong>Archived Repository</strong><br />
                    The code of this repository was written during a <strong>Hack Day</strong> by a <a href="https://marmelab.com/en/jobs">Marmelab developer</a>. It's part of the distributed R&D effort at Marmelab, where each developer spends 2 days a month for learning and experimentation.<br />
            <strong>This code is not intended to be used in production, and is not maintained.</strong>
        </td>
        </tr>
</table>

# Posters Galore for Android
An experimental Android application to easily buy posters, built with [React Native](https://facebook.github.io/react-native/docs/getting-started.html), using [Redux](http://rackt.org/redux/index.html) and a REST API.

![Posters Galore Example](http://image.noelshack.com/fichiers/2015/47/1447954279-posters-galore-example.png)

## Dependencies

- If you are not used to Android SDK, follow the [React Native Android Setup Guide](https://facebook.github.io/react-native/docs/android-setup.html)

- For JS dependencies, just run:

```bash
make install
```

## Run the application

- Install [Genymotion](https://www.genymotion.com/) (or another android emulator) and run a virtual android phone

- If it's the first time you launch the app, you should run `node node_modules/react-native/local-cli/cli.js android` (do not overwrite `.gitignore` and `index.android.js`)

- Run the following command:

```bash
make run
```

## Unit tests

```bash
make test
```
