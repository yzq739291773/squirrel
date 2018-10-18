<template>
    <div>
        <TopSwiper :tops='tops'></TopSwiper>
        <card :key="book.id" v-for="book in books" :book="book"></card>
        <p class='text-footer' v-if='!more'>
            没有更多数据
        </p>
    </div>
</template>

<script>
import {get} from '../../utils/index.js'
import Card from '@/components/card.vue'
import TopSwiper from '@/components/TopSwiper.vue'
export default {
    components:{
        card:Card,
        TopSwiper
    },
    data(){
        return {
            books:[],
            page:0,
            more:true,
            tops:[]
        }
    },
    onPullDownRefresh(){
        this.getList(true)
        this.getTop()
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
        this.getList(true)
        this.getTop()
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
        },
        async getTop(){
            const tops = await get('/weapp/top')
            this.tops = tops.list
        }
    }

}
</script>

<style>

</style>
