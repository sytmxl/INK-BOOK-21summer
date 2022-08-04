<template>
  <el-container>
    <el-header style="height: 80px; z-index: 1">
      <top-frame2></top-frame2>
    </el-header>
    <el-main style="overflow: scroll"> 
      <el-row class="info">
        <el-col :span="8">
            <span class="slo">您搜索{{content}}的结果如下：</span>
        </el-col>
      </el-row>
    </el-main>
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
  data(){
    return {
      content:JSON.parse(sessionStorage.getItem("searched")).content,
    };
  },
  methods:{
    
  },
  mounted()
  {
    console.log(this.$route.path);
  },
  
};

</script>

<style scoped>
  .slo{
    font-weight: bold;
    font-size: 30px;
    color:#444444;
    margin-left: -15%;
}
</style>