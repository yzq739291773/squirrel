// 工具函数库
import config from '../config'

// http get工具函数 获取数据
export function get(url, data) {
    return request(url, 'GET', data)
}
export function post(url, data) {
    console.log(1)
    return request(url, 'POST', data)
}

function request(url, method, data, header = {}) {
    console.log(2)
    return new Promise((resolve, reject) => {
        wx.request({
            data,
            method,
            header,
            url: config.host + url,
            success: (res) => {
                if (res.data.code === 0) {
                    resolve(res.data.data)
                } else {
                    showModal('失败', res.data.data.msg)
                    reject(res.data)
                }
            }
        })
    })
}

export function showModal(title, content) {
    wx.showModal({
        title,
        content,
        showCancel: false
    })
}
export function showSuccess(text) {
    wx.showToast({
        title: text,
        icon: 'success'
    })
}