const { Controller } = require('egg');

class BaseController extends Controller {
  ok(msg, data) {
    this.ctx.body = {
      code: 0,
      success: true,
      fail: false,
      msg: msg,
      data,
    };
  }

  okCode(code, msg, data) {
    this.ctx.body = {
      code: code,
      success: true,
      fail: false,
      msg: msg,
      data,
    };
  }

  fail(msg, data) {
    this.ctx.body = {
      code: 1,
      success: false,
      fail: true,
      msg: msg,
      data,
    };
  }
}

module.exports = BaseController;
