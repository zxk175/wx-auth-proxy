'use strict';

module.exports = appInfo => {
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config['keys'] = appInfo.name + '_1592980189740_7095';

  // add your middleware config here
  config['middleware'] = [];

  config['view'] = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      //左边写成.html后缀，会自动渲染.html文件
      '.html': 'nunjucks'
    },
  };

  config['cluster'] = {
    listen: {
      path: '',
      port: 6699,
      hostname: '127.0.0.1',
    }
  };

  config['security'] = {
    csrf: {
      enable: false
    }
  };

  const userConfig = {
    myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
