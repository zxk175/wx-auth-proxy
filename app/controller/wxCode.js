'use strict';

const Controller = require('./base');
const { oauthUrlForCode } = require('../../utils/common');
const { saveRouter, removeRouter, modifyRouter, infoRouter, listRouter } = require('../service/wxCode');

class WxCodeController extends Controller {
  async index() {
    const { ctx } = this;

    let auk = ctx.query.auk;
    let code = ctx.query.code;
    let queryString = decodeURIComponent(ctx.search);

    console.log(queryString);

    if (auk === undefined) {
      this.fail(`param auk not fund`);
      return;
    }

    let infoRouterDb = infoRouter('auk', auk);
    if (infoRouterDb === undefined) {
      this.fail(`auk [${auk}] not fund`);
      return;
    }

    if (code === undefined) {
      // 项目部署后的域名
      let redirectUrl = 'http://wx-auth-proxy.frp.zxk175.com/code/v1' + queryString;
      ctx.redirect(oauthUrlForCode(infoRouterDb.appId, redirectUrl));
      return;
    }

    ctx.redirect(`${infoRouterDb.url}${queryString}`);
  }

  saveRouter() {
    saveRouter(this.ctx.request.body);

    this.okCode(200, '添加成功');
  }

  removeRouter() {
    let body = this.ctx.request.body;
    body.forEach((item) => {
      removeRouter(item);
    });

    this.okCode(200, '删除成功');
  }

  modifyRouter() {
    modifyRouter(this.ctx.request.body);

    this.okCode(200, '修改成功');
  }

  infoRouter() {
    let infoRouterDb = infoRouter('id', this.ctx.query.id);

    this.ok('success', infoRouterDb);
  }

  listRouter() {
    this.ok('success', listRouter());
  }

}

module.exports = WxCodeController;
