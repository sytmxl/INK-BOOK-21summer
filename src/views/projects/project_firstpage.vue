<template>
  <el-container>
    <el-aside>
      <project-aside/>
    </el-aside>
    <el-main style="padding-top: 0">
      <router-view></router-view>
    </el-main>
  </el-container>

</template>

<script>
import topFrame from "../../components/topFrame.vue";
import ProjectAside from "../../components/ProjectAside";
export default {
 components: {
    topFrame,
    ProjectAside,
  },
}
</script>

<style>

.el-main {
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