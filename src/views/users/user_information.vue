<template>
  <el-container>
    <el-header>
      <top-frame></top-frame>
    </el-header>
    <el-container>
      <el-aside width="600px">
        <div class="pic" v-if="!imageUrl">
          <img src="../../assets/member_270x210.jpg" alt="" />
        </div>
        <div class="pic" v-else><img :src="imageUrl" alt="" /></div>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
import qs from "qs";
import topFrame from "../../components/topFrame.vue";
export default {
  inject: ['reload'],
  data() {
    return { 
      imageUrl: "" 
    
    };
  },
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
  height: 100vh;
}

.el-main {
  /* position: absolute; */
  left: 200px;
  right: 0;
  top: 80px;
  bottom: 0;
  overflow-y: hidden;
}
.pic {
  margin: 0 auto;
  padding-top: 10%;
  margin-bottom: -15px;
  height: 55%;
  width: 80%;
  /* background:pink; */
}
.pic img {
  height: 200px;
  width: 200px;
  border-radius: 50%;
}
</style>