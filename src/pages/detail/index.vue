<template>
  <div>
    <bookinfo :info='info'></bookinfo>
    <div class="comment">
      <textarea v-model='comment'
                class='textarea'
                :maxlength='100'
                placeholder='请输入图书短评'></textarea>
      <div class='location'>
        地理位置：
        <switch color='#EA5A49' :checked='location' @change='getGeo'></switch>
        <span class='text-primary'>{{location}}</span>
      </div>
      <div class='phone'>
        手机型号：
        <switch color='#EA5A49' :checked='phone' @change='getPhone'></switch>
        <span class='text-primary'>{{phone}}</span>
      </div>
      <button class="btn" @click='addComment'>
        评论
      </button>
    </div>
  <div class='text-footer'>
    未登录或者已经评论过啦
  </div>
  <button open-type='share' class="btn">转发给好友</button>
  </div>
</template>
<script>
import {get, post, showModel} from '@/utils'
import BookInfo from '@/components/BookInfo.vue'
export default {
  components: {
    bookinfo:BookInfo
  },
  data(){
    return {
      bookid:'',
      userinfo: {},
      info: {},
      comment: '',
      location: '',
      phone: ''
    }
  },
  methods:{
    async getDetail(){
      const info = await get('/weapp/bookdetail',{id:this.bookid})
       wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    },
    getGeo (e) {
      // F3SeLW3cwh1tb0mMQeKKNYzhVLtg757j
      const ak = 'F3SeLW3cwh1tb0mMQeKKNYzhVLtg757j'
      let url = 'http://api.map.baidu.com/geocoder/v2/'

      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json'
              },
              success: res => {
                console.log(res)
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知地点'
                  // console.log('出错了')
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      console.log('手机型号获取种')
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        // console.log(phoneInfo)
        this.phone = phoneInfo.model
      } else {
        // 没选中
        this.phone = ''
      }
    }
  },
  mounted(){
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
  }
}
</script>
<style lang='scss'>
.comment{
  margin-top:10px;
  .textarea{
    width:730rpx;
    height:200rpx;
    background:#eee;
    padding:10rpx;
  }
  .location{
    margin-top:10px;
    padding:5px 10px;
  }
  .phone{
    margin-top:10px;
    padding:5px 10px;
    
  }
}

</style>

