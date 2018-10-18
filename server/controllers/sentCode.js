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
                let exist = await mysql('csessioninfo').where({
                    open_id: openid
                }).select('session_key', "open_id").first()
                console.log('判断是否存在该数据', exist)
                if (exist) {
                    console.log('存在就更新，并返回已存在的结果')
                    await mysql('csessioninfo').where('open_id', openid)
                        .update({
                            session_key
                        })
                    ctx.state = {
                        code: 0,
                        data: {
                            openid: exist.open_id,
                            session_key: exist.session_key
                        }
                    }
                } else {
                    console.log('不存在就存入')
                    await mysql('csessioninfo').insert({
                        open_id: openid,
                        session_key,
                        user_info: userInfo
                    })
                    ctx.state = {
                        code: 0,
                        data: response.data
                    }
                }


            } catch (e) {
                console.log('数据库写入失败', e)
            }
        })
        .catch((error) => {
            console.log(11, error);
        });
}