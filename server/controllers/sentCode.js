const axios = require('axios')
const config = require('../config')
const { mysql } = require('../qcloud')
    // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
module.exports = async(ctx) => {
    const code = ctx.query.code
    await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: config.appId,
                secret: config.appSecret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        }).then((response) => {
            console.log('服务端请求响应1', response.data);
            ctx.state = {
                code: 0,
                data: response.data
            }
            console.log('响应客户端', ctx.state)
        })
        .catch((error) => {
            console.log(11, error);
        });
}