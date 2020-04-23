const Koa = require('koa')
const views = require('koa-views')
const logger = require('koa-logger')
const statics = require('koa-static')
const router = require('./router')
const app = new Koa()

app.use(logger())
app.use(statics(__dirname + '/public'))
app.use(views(__dirname + '/views', {extension: 'ejs'}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(router.routes());

module.exports = app
