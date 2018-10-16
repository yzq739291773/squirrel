module.exports = async(ctx) => {
    console.log('demo控制器')
    ctx.state.data = {
        msg: 'hello 小程序后台123'
    }
    console.log('demo响应数据')
}