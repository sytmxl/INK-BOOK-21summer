<template>
  <div id="init">
    <el-row>
      <el-col :span="7" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 1 : 0">
        <drawio-u-m-l/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import DrawioUML from "@/components/drawioUML";
export default {
  components: {DrawioUML}
}
</script>

<style scoped>
#init{
    margin:20px auto;
    color:blueviolet;
    font-size: large;
    font-weight: bold;
}
</style>