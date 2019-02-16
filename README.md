# Test project for new react-native-webview sharedCookiesEnabled feature

This is just an example or test project for the
PR [#175](https://github.com/react-native-community/react-native-webview/pull/175)
in the react-native-webview project.

It contains a small expressjs based server to set and clear cookies
and a React Native Compontent to call these endpoints with `fetch` or by opening
the URLs with an UIWebView or a WKWebView.

For more details see
PR [#175](https://github.com/react-native-community/react-native-webview/pull/175).

You can see the full diff against the master branch here:
[compare master...shared-cookies](https://github.com/react-native-community/react-native-webview/compare/master...jerolimov:shared-cookies)

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
