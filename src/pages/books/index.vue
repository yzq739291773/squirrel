<template>
    <div>
        <Card :key="book.id" v-for="book in books" :book="book"></Card>
        <p class='text-footer' v-if='!more'>
            没有更多数据
        </p>
    </div>
</template>

<script>
import {get} from '../../utils/index.js'
import Card from '@/components/card.vue'
export default {
    components:{
        Card
    },
    data(){
        return {
            books:[],
            page:0,
            more:true,
        }
    },
    onPullDownRefresh(){
        this.getList(true)
    },
     onReachBottom(){
        if(!this.more){
            // 没有更多了
            return false
        }
        this.page = this.page+1
        this.getList()
    },
    mounted(){
        this.getList()
    },
    methods:{
        async getList(init){
            if(init){
                this.page = 0
                this.more = true
            }
            wx.showNavigationBarLoading()
            const books = await get('/weapp/booklist',{page:this.page})
            if(books.list.length < 7 && this.page >0){
                this.more = false
            }
            if(init){
                this.books= books.list
                wx.stopPullDownRefresh()
            }else{
                // 上拉加载
                this.books = this.books.concat(books.list)
            }
            wx.hideNavigationBarLoading()
        }
    }

}
</script>

<style>

</style>
