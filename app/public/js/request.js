let baseUrl = window.location.origin;

axios.defaults.timeout = 60 * 1000;
axios.defaults.baseUrl = baseUrl;
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config) {
  config.headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };

  config.headers.token = getToken();

  return config;
}, function(err) {
  error('请求超时');

  return Promise.resolve(err);
});

axios.interceptors.response.use(function(data) {
  checkSuccess(data);

  return data;
}, function(err) {
  checkError(err);

  return Promise.resolve(err);
});

function get(url, success, error) {
  return axios({
    url: url,
    method: 'get'
  })
    .then(success)
    .catch(error);
}

function post(url, params, success) {
  return axios({
    url: url,
    method: 'post',
    data: params
  })
    .then(success);
}

function del(url, success) {
  return axios({
    url: url,
    method: 'delete'
  })
    .then(success);
}

function put(url, params, success) {
  return axios({
    url: url,
    method: 'put',
    data: params
  })
    .then(success);
}

function toLoginPage() {
  setTimeout(function() {
    if (isIframe()) {
      window.location.href = window.location.origin + '/#/login';
    } else {
      window.parent.location.href = window.parent.location.origin + '/#/login';
    }
  }, 16000);
}

function ssSet(key, value) {
  window.sessionStorage.setItem(key, value);
}

function ssGet(key) {
  return window.sessionStorage.getItem(key);
}

function isIframe() {
  return self === top;
}

function getToken() {
  return 'N4FG';
}

function getQueryString(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  // search,查询？后面的参数，并匹配正则
  let regMatch = window.location.search.substr(1)
    .match(reg);

  if (regMatch == null) {
    return null;
  }

  return unescape(regMatch[2]);
}

function checkSuccess(data) {
  let code = data.data.code;
  // 请求成功不显示消息
  if (code === 0 || code === 500301) {
    return;
  }

  if (data.data.success) {
    success(data.data.msg);
  } else {
    error(data.data.msg);
  }
}

function checkError(err) {
  if (err.response) {
    const status = err.response.status;
    switch (status) {
      case 401:
        error('未授权，请登录');
        break;
      case 403:
        error('拒绝访问');
        break;
      case 404:
        error(`请求地址不存在: ${err.response.config.url}`);
        break;
      case 500:
        error('服务器内部错误');
        break;
      case 502:
        error('网络错误或服务器关闭');
        break;
      default:
        error(`(${status}) 未知错误`);
        break;
    }
  } else {
    let msg = err.message;
    if (msg && msg.indexOf('timeout') > -1) {
      error('请求超时');
    } else if (msg && msg.indexOf('Network') > -1) {
      error('网络错误或服务器关闭');
    } else {
      error(msg || '未知错误');
    }
  }
}

function success(msg) {
  this.ELEMENT.Message.success({
    message: msg,
    duration: 2000
  });
}

function error(msg) {
  this.ELEMENT.Message.error({
    message: msg,
    duration: 3000
  });
}
