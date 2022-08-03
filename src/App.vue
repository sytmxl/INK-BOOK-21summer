<template>
 <div id="app">
   <router-view v-if="isRouterAlive"/>

 </div>
 
</template>
 
<script>
import ProjectAside from "@/components/ProjectAside";
export default {
 name: 'App',
  components: {ProjectAside},
  provide () {
   return{
     reload: this.reload
   }
 },
 data() {
   return {
       isRouterAlive: true,
     editing : sessionStorage.getItem('editing')
   }
 },
 methods:{
   reload(){
     this.isRouterAlive = false
     this.$nextTick(function(){
       this.isRouterAlive = true
     })
   }
 }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: gray;
}
* {
  margin: 0;
  padding: 0;
}
</style>

