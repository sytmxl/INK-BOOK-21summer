<template>
  <el-container>
    <el-header style="height: 80px; z-index: 1">
      <top-frame2></top-frame2>
    </el-header>
    <el-main style="overflow: scroll"> </el-main>
  </el-container>
</template>

<script>
import qs from "qs";
import topFrame2 from "../../components/topFrame2.vue";
export default {
  inject: ["reload"],
  components: {
    topFrame2,
  },
  methods:{
    
  },
  mounted()
  {
  }
};
</script>

<style scoped>

</style>