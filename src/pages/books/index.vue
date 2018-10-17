<template>
    <div>
        <Card :key="book.id" v-for="book in books" :book="book"></Card>
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
            books:[]
        }
    },
    mounted(){
        console.log('我被挂载了')
        this.getList()
    },
    methods:{
        async getList(){
            const books = await get('/weapp/booklist',{})
            this.books= books.list
        }
    }

}
</script>

<style>

</style>
