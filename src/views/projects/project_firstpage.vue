<template>
  <el-container>
    <el-aside>
      <project-aside/>
    </el-aside>
    <el-main style="padding: 0px;">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
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
  height: 100%;
  /* background-color: rgba(244, 247, 249, 0.371); */
}

</style>