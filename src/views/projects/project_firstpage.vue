<template>

   

    <el-container>
  <el-aside><project-aside></project-aside></el-aside>
  <el-container>
<<<<<<< HEAD
    <!-- <el-header style="height:80px;"><top-frame></top-frame></el-header> -->
    <el-main> 

  <div id="init">
    <router-view></router-view>
  </div>

  </el-main>
=======
    <el-aside>
      <project-aside/>
    </el-aside>
    <el-main style="padding-top: 0">
      <router-view></router-view>
    </el-main>
>>>>>>> 620f1ed258528a344c527d6d1df62280a87cc23e
  </el-container>
</el-container>

</template>

<script>
// import topFrame from "../../components/topFrame.vue";
import ProjectAside from "../../components/ProjectAside";
export default {
 components: {
    // topFrame,
    ProjectAside,
  },
}
</script>

<style>

.el-main {
     /* overflow:visible;  */
    /* padding-top: 0;  */
  position: absolute;
  left: 200px;
  right: 0;
  top: 0px;
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

</style>