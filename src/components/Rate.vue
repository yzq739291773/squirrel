<template>
  <div class='rate'>
    <span>☆☆☆☆☆</span>
    <div class="hollow" :style='style'>
      ★★★★★
    </div>
    
  </div>
</template>
<script>
// vue-tiny-rate
export default {
  props:{
    value:{
        type:[Number,String],
        default:'0'
    }
  },
  computed:{
    style(){
      return `width:${(this.value*0.8)/2}em`
    }
  }
}
</script>
<style lang='scss'>
.rate{
  font-size: 16px;
  width: 5em;
  // border: 1px solid black;
  position: relative;
  display: inline-block;
  .hollow{
    font-size: 16px;
    position: absolute;
    display: inline-block;
    // top:100%;
    top:0;
    left:0;
    width:0;
    overflow:hidden;
  }
}
</style>


