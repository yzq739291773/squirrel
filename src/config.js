// 配置项

const host = 'http://192.168.31.128:5757'

const config = {
    host,
    loginUrl: `${host}/weapp/login`,
    userUrl: `${host}/weapp/user`,
    sentCode: `${host}/weapp/sentCode`
}
export default config