<template>
  <div id="root" class="root">
     <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
    return {
       isRouterAlive:true
    }
  },
  provide (){
     return {
       reload:this.reload
     }
  },
    methods:{
      reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
     }
  },
  }
</script>

<style lang="scss" scoped>
  .root{
    width: 100%;
    height: 100%;
  }
</style>
