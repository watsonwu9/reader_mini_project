module.exports = async (ctx, next) => {
    // 通过 Koa 中间件进行登录态校验之后
    // 登录信息会被存储到 ctx.state.$wxInfo
    // 具体查看：
    ctx.state.data = {
        msg: '你好，小程序,我是你的后台服务器（本地）吃饭了么'
    }
}
