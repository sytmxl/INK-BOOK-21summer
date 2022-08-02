<template>

   

    <el-container>
  <el-aside><common-aside></common-aside></el-aside>
  <el-container>
    <el-header style="height:80px;"><top-frame></top-frame></el-header>
    <el-main> 

  <div id="init">
    <router-view></router-view>
  </div>

  </el-main>
  </el-container>
</el-container>

</template>

<script>
import topFrame from "../../components/topFrame.vue";
import CommonAside from "../../components/CommenAside.vue";
export default {
 components: {
    topFrame,
    CommonAside
  },
}
</script>

<style scoped>

.el-main {
     /* overflow:visible;  */
    /* padding-top: 0;  */
  position: absolute;
  left: 200px;
  right: 0;
  top: 80px;
  bottom: 0;
  overflow-y: scroll;
  }
  .el-aside{
   display: block;
  position: absolute;
  left: 0;
  top: 80px;
  bottom: 0;
}
.el-header {
  background-color: white;
  text-align: left;
  color:black;
  /* box-shadow: 1px 1px 10px rgb(240, 242, 245); */
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  z-index: 1;
}
</style>