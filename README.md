# proud stories

Introducing "proud stories" - a micro social-investment SNS where users share their activities showcasing pride in their community with the world through short videos. Users can also receive "applause" - a small monetary contribution for each upvote a video receives.

Check it out on the Google Play Store [here](loc cit)!

[Insert several screenshots here]

This repo contains the mobile app written in React Native. Presently it is compatible with Android, but will be available on iOS in a future release.

## Getting Started

#### Installation

First install Android Studio, and Android SDK. To build the app, it will be necessary to add a file called `local.properties` in the `android/` folder containing the line `sdk.dir=path/to/Android/sdk`. The default paths are

```sdk.dir=/home/USERNAME/Android/Sdk``` (Linux) <br>
```sdk.dir=/Users/USERNAME/Library/Android/sdk``` (Mac) <br>
```sdk.dir=C:\\Users\\USERNAME\\AppData\\Local\\Android\\sdk``` (Windows)

Then from the root directory get dependencies with `npm install`.for communities with video sharing foll

#### Environment variables

For authentication we use Auth0. Sign up and obtain credentials from [link to auth0] and add them to a `.env` file in the root directory following `.env.example`.

#### Running the app in emulator with Android SDK

First open an emulator. Our primary device for testing was the Pixel 2, which can be started from terminal by running

```path/to/Android/sdk/emulator/emulator --avd Pixel_2_API_29 -no-snapshot -wipe-data```

Once the emulator has opened, from the root directory run `react-native run-android` to build the app and start metro bundler. If the server stops use `react-native start` to restart without the rebuild.

