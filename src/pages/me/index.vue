<template>
  <div class="container">
    <div class="userinfo" >
      <img :src="userInfo.avatarUrl" alt="">
      <p>{{userInfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if='openid' @click='scanBook' class='btn'>添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
  </div>
</template>

<script>

import YearProgress from '@/components/YearProgress'
import {get, post, showSuccess} from '../../utils/index.js'
import config from '@/config'

export default{
    components: {
        YearProgress
    },
    created() {
        this.userInfo = wx.getStorageSync('userInfo')
        this.openid = wx.getStorageSync('openid')
    },
    data () {
        return {
            openid:'',
            userInfo: {
                avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
                nickName: '',
                openid:''
            },
            code:''
        }
    },
    methods:{
        scanBook () {
            wx.scanCode({
                success: (res) => {
                if (res.result) {
                    console.log(res.result)
                }
                }
            })
        },
        loginSuccess (res) {
            showSuccess('登录成功')
            wx.setStorageSync('userinfo', res)
            this.userinfo = res
        },
        async login(){
            let user = wx.getStorageSync('userInfo')
            if(!user){
                // 获取临时凭证code
                wx.login({
                    success:async (res)=>{
                        console.log('code')
                        this.code = res.code
                        //    发送code到开发者服务器，从而通过开发者服务器获得openid
                        wx.request({
                            data:{code:res.code},
                            methods:'GET',
                            url: config.sentCode,
                            success: (res)=> {
                                console.log('sentCode响应',res)
                                wx.setStorageSync('openid', res.data.data.openid)
                                this.openid = res.data.data.openid
                                wx.getUserInfo({
                                    success:(res)=>{
                                        console.log('用户信息', res)
                                        // res.userinfo.openid = this.openid
                                        wx.setStorageSync('userInfo', res.userInfo)
                                        this.userInfo = res.userInfo
                                        showSuccess('登陆成功')
                                    },
                                    fail:(err)=>{
                                        console.log('获取用户信息失败',err)
                                    }
                                })
                            }
                        })
                            
                    },
                    fail:(error)=>{
                        console.log('获取code失败',error)
                    }
                })
            }
        },
        onShow () {
            wx.showShareMenu()
            let userinfo = wx.getStorageSync('userinfo')
            if (userinfo) {
            this.userinfo = userinfo
            }
        },
    }
}
</script>
<style lang='scss'>
.container{
  padding:0 30rpx;

}  
.userinfo{
  margin-top:100rpx;
  text-align:center;
  img{
    width: 150rpx;
    height:150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
}
</style>