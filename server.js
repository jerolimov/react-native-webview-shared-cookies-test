const express = require('express')
const cookieParser = require('cookie-parser')

const COOKIE_EXPIRES_AFTER_MS = 60000
const COOKIE_NAME = 'cookiename'
const COOKIE_NAME2 = 'cookiename2'
const COOKIE_VALUE = 'cookievalue'
const COOKIE_VALUE2 = 'cookie \' äöüß " !! XXX'

const app = express()

const links = `
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <p>
  <a href="/get">get</a> &nbsp;
  <a href="/get2/">get2</a> &nbsp;
  <a href="/set">set</a> &nbsp;
  <a href="/set2">set2</a> &nbsp;
  <a href="/clear">clear</a> &nbsp;
  <a href="/clear2">clear2</a> &nbsp;
</p>\n`

app.use(cookieParser())

app.get('/', function (req, res) {
  res.send(links + `<p>Hello!</p>`)
})

app.get('/get', function (req, res) {
  res.send(links + `
  <p>Get cookie: <code>${COOKIE_NAME}=${req.cookies[COOKIE_NAME]}</code></p>
  <p>Get cookie2: <code>${COOKIE_NAME2}=${req.cookies[COOKIE_NAME2]}</code></p>
  <script>document.write('JS cookies: <code>' + document.cookie + '</code>')</script>`)
})

app.get('/get2/', function (req, res) {
  res.send(links + `
  <p>Get cookie: <code>${COOKIE_NAME}=${req.cookies[COOKIE_NAME]}</code></p>
  <p>Get cookie2: <code>${COOKIE_NAME2}=${req.cookies[COOKIE_NAME2]}</code></p>
  <script>document.write('JS cookies: <code>' + document.cookie + '</code>')</script>`)
})

app.get('/set', function (req, res) {
  res.cookie(COOKIE_NAME, COOKIE_VALUE, { path: '/', expires: new Date(Date.now() + COOKIE_EXPIRES_AFTER_MS) })
  res.send(links + `
  <p>Get cookie: <code>${COOKIE_NAME}=${req.cookies[COOKIE_NAME]}</code></p>
  <p>Get cookie2: <code>${COOKIE_NAME2}=${req.cookies[COOKIE_NAME2]}</code></p>
  <p>Set cookie: <code>${COOKIE_NAME}=${req.cookies[COOKIE_NAME]}</code></p>
  <script>document.write('JS cookies: <code>' + document.cookie + '</code>')</script>`)
})

app.get('/set2', function (req, res) {
  res.cookie(COOKIE_NAME2, COOKIE_VALUE2, { path: '/get2/', expires: new Date(Date.now() + COOKIE_EXPIRES_AFTER_MS) })
  res.send(links + `
  <p>Get cookie: <code>${COOKIE_NAME}=${req.cookies[COOKIE_NAME]}</code></p>
  <p>Get cookie2: <code>${COOKIE_NAME2}=${req.cookies[COOKIE_NAME2]}</code></p>
  <p>Set cookie: <code>${COOKIE_NAME2}=${req.cookies[COOKIE_NAME2]}</code></p>
  <script>document.write('JS cookies: <code>' + document.cookie + '</code>')</script>`)
})

app.get('/clear', function (req, res) {
  res.clearCookie(COOKIE_NAME)
  res.send(links + `
  <p>Clear cookie: <code>${COOKIE_NAME}=${req.cookies[COOKIE_NAME]}</code></p>
  <script>document.write('JS cookies: <code>' + document.cookie + '</code>')</script>`)
})

app.get('/clear2', function (req, res) {
  res.clearCookie(COOKIE_NAME2)
  res.send(links + `
  <p>Clear cookie: <code>${COOKIE_NAME2}=${req.cookies[COOKIE_NAME2]}</code></p>
  <script>document.write('JS cookies: <code>' + document.cookie + '</code>')</script>`)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
