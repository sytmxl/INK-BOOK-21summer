<template>
  <div id="init">
    <el-row>
      <el-col :span="7" v-for="(o, index) in 9" :key="o" >
        <drawio-prototype/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import drawioPrototype from "@/components/drawioPrototype";
export default {
  components: {drawioPrototype}
}
</script>

<style scoped>
#init{
    margin:20px auto;
    color:blueviolet;
    font-size: large;
    font-weight: bold;
}
.el-col {
  margin: 22px;
  /* background-color: beige; */
}
</style>