<template>
  <el-container>
    <el-container>
      <el-aside>
        <project-aside/>
      </el-aside>
      <el-main style="padding: 0px;">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ProjectAside from "../../components/ProjectAside";
export default {
  components: {
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