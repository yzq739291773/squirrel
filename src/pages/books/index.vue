<template>
    <div>
        图书列表
    </div>
</template>

<script>
import {get} from '../../utils/index.js'
export default {
    data(){
        return {
            books:[]
        }
    },
    mounted() {
        this.getList()
    },
    methods:{
        async getList(){
            const books = await get('/weapp/booklist',{})
            console.log('图书列表',books)
        }
    }

}
</script>

<style>

</style>
