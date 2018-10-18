<template>
<div class="container">
  <CommentList v-if='openid'
       type='user' 
       :comments="comments"></CommentList>
  <div v-if='openid'>
    <div class="page-title">我的图书</div>
    <card 
      v-for='book in books' 
      :key='book.id'
      :book='book'></card>
    <div v-if='!books.length'>暂时还没添加过书，快去添加几本把</div>
  </div>
</div>
</template>
<script>
import {get} from '@/utils'
import CommentList from '@/components/CommentList.vue'
import Card from '@/components/card.vue'
export default {
  data(){
    return {
      comments:[],
      books:[],
      openid:''
    }

  },
  components:{
    card:Card,
    CommentList
  },
  methods:{
    init(){
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getBooks(){
      const books = await get('/weapp/booklist',{
        openid:this.openid
      })
      this.books = books.list
    },
    async getComments(){
      const comments = await get('/weapp/commentlist',{
        openid:this.openid
      })
      this.comments = comments.list
    }
  },
  onPullDownRefresh(){
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow(){
    if(!this.openid){
      let openid = wx.getStorageSync('openid')
      if(openid){
        this.openid = openid
        this.init()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
    margin: 0;
    padding: 0;
}

</style>
