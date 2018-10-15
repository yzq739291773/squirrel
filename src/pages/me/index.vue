<template>
  <div class="container">
    <div class="userinfo" >
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
  </div>
</template>

<script>

import qcloud from 'wafer2-client-sdk'
import YearProgress from '@/components/YearProgress'
import {get, post, showSuccess} from '../../utils/index.js'
import config from '@/config'

export default{
    components: {
        YearProgress
    },
    data () {
        return {
            userinfo: {
                avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
                nickName: ''
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
           console.log('我被点击了')
        wx.login({
               success:async (res)=>{
                   console.log('code')
                   this.code = res.code
                   console.log('请求地址',config.sentCode)
                   wx.request({
                    data:{code:res.code},
                    methods:'GET',
                    url: config.sentCode,
                    success: function(res) {
                        console.log('sentCode响应',res)
                    }
                })
                    
               },
               fail:(error)=>{
                   console.log('获取code失败',error)
               }
           })
          
        },
        onShow () {
            wx.showShareMenu()
            let userinfo = wx.getStorageSync('userinfo')
            if (userinfo) {
            this.userinfo = userinfo
            }
        },
        getUserInfo (e) {
            console.log(11,e)
        }
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