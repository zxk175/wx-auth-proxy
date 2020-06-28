# wx-oauth-proxy

## 公众号授权域名代理

## 启动

``` bash
# install dependencies
yarn

# serve with hot reload
yarn debug
```

## 极速使用
1. 假设将网页授权回调域名设置为`www.xxx.com`
2. 部署项目
3. 跳转项目首页，配置路由信息
4. 在微信内或使用微信web开发者工具访问`http://www.xxx.com/code/v1?auk=zxk175`
5. 页面将跳转到`auk=zxk175`的url：`redirectUrlMap[auk]?auk=zxk175&code=xxx&state=xxx`

## 攻略指南
1. `?auk=zxk175`中的`auk`、`zxk175`以及此时的`授权url`（即接收`授权code`的url，最终跳转的url）都是可以自定义的；
2. 网页授权接口中的get参数`code`和`state`可以以get参数的形式传递给`/code/v1`，程序会把它们再传递给接口；
3. 除了get参数`auk`外，传递给`/code/v1`的任何get参数都会以get参数的形式再传递给`授权url`；

## 郑重声明
* 本程序仅供学习研究使用，不得用于非法用途，否则后果自负；
* 对于由本程序导致的一切法律和安全问题，作者不承担任何责任；
