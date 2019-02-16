// tslint:disable:no-console

import React, { Component } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { WebView } from 'react-native-webview'
// import axios, { AxiosRequestConfig } from 'axios'

const styles = StyleSheet.create({
  linkActive: {
    color: 'black',
  },
  linkAvailable: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
})

interface State {
  baseURL: string,
  fetchResult?: string,
  webview: 'NONE' | 'UIWebView' | 'WKWebView'
}

export default class WebViewTest extends Component<{}, State> {
  state: State = {
    baseURL: 'http://localhost:3000/',
    webview: 'NONE',
  }

  renderFetchButton(action: 'get' | 'set' | 'set2' | 'clear' | 'clear2') {
    const onPress = async () => {
      try {
        const response = await fetch(this.state.baseURL + action, { credentials: 'include' })
        const text = await response.text()

        // const response = await axios.get(this.state.baseURL + action)
        // const text = response.data

        const match = text.match(/<code>(.*)<\/code>/)
        if (match && match[1]) {
          this.setState({ fetchResult: match[1] })
        } else {
          this.setState({ fetchResult: text })
        }
      } catch (error) {
        this.setState({ fetchResult: 'Error' })
        console.warn(action + ' error:', error)
      }
    }

    return (
      <TouchableOpacity onPress={onPress} style={{ paddingLeft: 10 }}>
        <Text style={styles.linkAvailable}>{action}</Text>
      </TouchableOpacity>
    )
  }

  renderWebViewButton(webview: 'NONE' | 'UIWebView' | 'WKWebView') {
    return (
      <TouchableOpacity onPress={() => this.setState({ webview })} style={{ paddingLeft: 10 }}>
        <Text style={this.state.webview === webview ? styles.linkActive : styles.linkAvailable}>{webview}</Text>
      </TouchableOpacity>
    )
  }

  renderWebView() {
    if (this.state.webview === 'UIWebView' || this.state.webview === 'WKWebView') {
      return (
        <View style={{ flex: 1, borderWidth: 1, borderColor: 'gray' }}>
          <WebView
            source={{ uri: this.state.baseURL + 'get' }}
            useWebKit={this.state.webview === 'WKWebView'}
            sharedCookiesEnabled={this.state.webview === 'WKWebView'}
            style={{ flex: 1 }}
          />
        </View>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 10 }}>WebViewTest</Text>

          <View style={{ paddingBottom: 10 }}>
            <Text>Base URL: {this.state.baseURL}</Text>
          </View>

          <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
            <Text>Fetch:</Text>
            {this.renderFetchButton('get')}
            {this.renderFetchButton('set')}
            {this.renderFetchButton('set2')}
            {this.renderFetchButton('clear')}
            {this.renderFetchButton('clear2')}
          </View>

          <Text style={{ paddingBottom: 10 }}>{this.state.fetchResult}</Text>

          <View style={{ flexDirection: 'row', paddingBottom: 10 }}>
            <Text>Use WebView:</Text>
            {this.renderWebViewButton('NONE')}
            {this.renderWebViewButton('UIWebView')}
            {this.renderWebViewButton('WKWebView')}
          </View>

          {this.renderWebView()}
        </View>
      </SafeAreaView>
    )
  }
}
