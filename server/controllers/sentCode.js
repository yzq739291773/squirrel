const axios = require('axios')
const config = require('../config')
const { mysql } = require('../qcloud')
    // https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
module.exports = async(ctx) => {
    console.log(111111, ctx.query)
    const { code, userInfo } = ctx.query
    await axios.get('https://api.weixin.qq.com/sns/jscode2session', {
            params: {
                appid: config.appId,
                secret: config.appSecret,
                js_code: code,
                grant_type: 'authorization_code'
            }
        }).then(async(response) => {
            console.log('服务端请求响应1', response.data);
            console.log(22, userInfo)
            let { openid, session_key } = response.data
            try {
                await mysql('csessioninfo').insert({
                    open_id: openid,
                    session_key,
                    user_info: userInfo
                })
                ctx.state = {
                    code: 0,
                    data: response.data
                }
            } catch (e) {
                console.log('数据库写入失败')
            }
        })
        .catch((error) => {
            console.log(11, error);
        });
}