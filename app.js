const Koa = require('koa')
const views = require('koa-views')
const logger = require('koa-logger')
const statics = require('koa-static')
const router = require('./router')
const app = new Koa()

app.use(logger())
app.use(statics(__dirname + '/public'))
app.use(views(__dirname + '/views', {extension: 'ejs'}))

// routes
app.use(router.routes());

module.exports = app
