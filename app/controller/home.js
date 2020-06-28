'use strict';

const Controller = require('./base');

class HomeController extends Controller {
  async index() {
    await this.ctx.render('index', {
      title: '微信公众号Code路由配置'
    });
  }

}

module.exports = HomeController;
