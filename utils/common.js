function oauthUrlForCode(appId, redirectUrl) {
    // 回调地址
    let redirectUri = encodeURIComponent(redirectUrl);

    // snsapi_base or snsapi_userinfo
    let scope = "snsapi_base";

    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=#wechat_redirect`;
}

module.exports = {
    oauthUrlForCode: oauthUrlForCode
}
