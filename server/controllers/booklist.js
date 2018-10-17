const { mysql } = require('../qcloud')
module.exports = async(ctx) => {
    const books = await mysql('books')
        .select('books.*', 'csessioninfo.user_info')
        .join('csessioninfo', 'books.openid', '=', 'csessioninfo.open_id')
        .orderBy('books.id', 'desc')
        // console.log('books', books)
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}