<template>
  <el-container>
    <el-header>
    <top-frame></top-frame>
    </el-header>
    <el-container>
      <el-aside width="300px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import topFrame from "../../components/topFrame.vue";
export default {
  components: {
    topFrame,
  },
};
</script>

<style scoped>
.el-header {
  height: 100px;
  background-color: white;
  line-height: 70px;
  text-align: center;
  color: black;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  z-index: 1;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100%;
}

.el-main {
  /* position: absolute; */
  left: 200px;
  right: 0;
  top: 80px;
  bottom: 0;
  overflow-y: hidden;
}
</style>