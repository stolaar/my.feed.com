const express = require('express')
const app = express()
require('dotenv').config()
const request = require('request')
const PORT = process.env.PORT_NUMBER || 5000

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const BaseError = require('./src/errors/Base')
const passport = require('passport')

const authRouter = require('./src/routes/api/auth/auth')
const feedRouter = require('./src/routes/api/feed/feed')
const usersRouter = require('./src/routes/api/users/users')
const logger = require('./src/jobs/logger/logger')
require('./src/models/db')

const initCronJobs = require('./src/cron/index')
initCronJobs()

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
global.appRoot = path.resolve(__dirname)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/public/*', function (req, res, next) {
  res.sendFile(path.join(__dirname, req.path), function (err) {})
})

app.use(passport.initialize())
passport.serializeUser((user, done) => {
  done(null, user)
})

app.use((req, res, next) => {
  req.appUrl = req.protocol + '://' + req.get('host')
  next()
})

require('./src/authentication/jwt')(passport)


app.use('/api/auth', authRouter)
app.use('/api/feed', feedRouter)
app.use('/api/users', usersRouter)

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/post-image', async function (req, res) {
  const { img, ...rest } = req.query
  const url = new URL(img)
  Object.keys(rest).forEach(key => url.searchParams.append(key, rest[key]))
  request.get({url}).pipe(res)
})

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {})
})

app.use((err, req, res, _) => {
  let statusCode = err.httpCode || 400
  if (!(err instanceof BaseError)) {
    logger.error({label: 'Unhandled error', err: err.message})
    process.exit(1)
  }
  return res.status(statusCode).send(err)
})

app.listen(PORT, () => logger.info('App listening on port ' + PORT))
