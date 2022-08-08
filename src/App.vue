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

el-icon:hover, el-icon-close:hover {
    color:  #748391 !important;
}
.el-input__inner,.el-textarea__inner {
  border-radius: 10px !important;
}
.el-input__inner:focus,.el-textarea__inner:focus {
  border-color: #748391 !important;
  /* background-color: #edeff071 !important; */
  /* background-color: #c8d3dd !important; */
}
.el-dialog, .el-message-box {
  padding: 10px 10px 25px 10px !important;
  border-radius: 20px !important;
  border-color: #9aadbd !important;
  /* backdrop-filter: blur(25px) brightness(110%); */
  background-color: #f4f5f6 !important; 
  /* transition: 1s !important; */
  -n-bezier-ease-out: cubic-bezier(0, 0, 0.2, 1);
}
.el-dialog__wrapper, .el-message-box__wrapper {
  backdrop-filter: blur(15px) brightness(150%) !important;
  /* transition: 1s !important; */
}
.el-button {
  border-radius: 10px !important;
  transition: 0.4s !important;
}
.el-button--primary {
  background-color: #9aadbd !important;
  border: none !important;
}
.el-button--primary:hover {
  background-color: #c8d3dd !important;
  color: #ffffff !important;
  border-color: #c8d3dd !important;
}
.el-button--default:hover {
  /* width: 20%; */
  background-color: #c8d3dd !important;
  color: #ffffff !important;
  border-color: #c8d3dd !important;
}
.el-popper, .el-dropdown-menu__item {
  color: #35424e !important;
  font-family: 微软雅黑 !important;
}
</style>

