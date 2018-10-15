const axios = require('axios')
const config = require('../config')
    // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
module.exports = async(ctx) => {
    const code = ctx.query.code
    console.log('客户端的code', code)
    console.log('appid', config.appId)
    console.log('secret', config.appSecret)

    axios.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: config.appId,
                secret: config.appSecret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        })
        .then((response) => {
            console.log('服务端请求响应', response.data);
        })
        .catch((error) => {
            console.log(11, error);
        });

    ctx.state.data = {
        code: 200,
        text: open
    }
}