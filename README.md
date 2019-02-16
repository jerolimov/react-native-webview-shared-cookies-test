# Example / test project for new react-native-webview feature `sharedCookiesEnabled`

## Project setup

Project was created with

```
react-native init WebViewSharedCookies --template typescript
yarn add "react-native-webview@jerolimov/react-native-webview#shared-cookies"
react-native link react-native-webview
```

## Run tests

*   Run the local express server with `yarn server` (or npm run server).
*   Start also the metro bundle for the React Native app with `yarn start` (or npm start).
*   Open the Xcode project `ios/WebViewSharedCookies.xcodeproj` and run the app in an **iOS 9 or 10 Simulator**.

See [server.js](server.js) and [WebViewTest.tsx](WebViewTest.tsx) how to set cookies.
