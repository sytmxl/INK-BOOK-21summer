<template>
  <div id="init">
    <el-row>
      <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
        <drawio/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Drawio from "@/components/drawio";
export default {
  components: {Drawio}
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