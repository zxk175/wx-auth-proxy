const Router = require('koa-router')
const {oauthUrlForCode} = require('../utils/common')

const router = new Router()
router.prefix("");

router.get('/', async (ctx) => {
    let title = '首页'
    await ctx.render('index', {
        title
    })
})

router.get('/404', async (ctx) => {
    let title = "404"
    await ctx.render('error', {
        title
    })
})

router.get('/code/v1', ctx => {
    let auk = ctx.query.auk;
    let code = ctx.query.code;
    let queryString = ctx.search;

    if (auk === undefined) {
        ctx.redirect("/404");
        return;
    }

    let redirectUrlMap = {
        "zxk175": "http://wx.frp.zxk175.com/wx-mp/login/v1"
    }

    if (redirectUrlMap[auk] === undefined) {
        ctx.body = `auk：${auk} not fund`;
        return;
    }

    let fullUrl;
    if (code === undefined) {
        // 项目部署后的域名
        let redirectUrl = "http://wx-auth-proxy.frp.zxk175.com/code/v1" + queryString;
        fullUrl = oauthUrlForCode("xxx", redirectUrl);
    } else {
        let redirectUrl = redirectUrlMap[auk];
        fullUrl = `${redirectUrl}${queryString}`;
    }

    ctx.redirect(fullUrl);
});

// 装载所有子路由
let routers = new Router()
routers.use(router.routes(), router.allowedMethods())

module.exports = routers
