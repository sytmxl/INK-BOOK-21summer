<template>
  <el-container>
    <el-header>
      <span>
        <h1>分享文件：{{picHeader}}</h1>
        <p>图注：{{picInfo}}</p>
      </span>
    </el-header>
    <el-main>
      <img :src="picData">
    </el-main>
  </el-container>
</template>

<style scoped>
.h1 {
  /* font-size: 18px; */
  font-size: 20px;
  color: rgba(119, 147, 168, 0.64);
  margin-top: 50px;
}
img {
  max-width: calc(90vw);
  max-height: calc(90vh);
}
.el-container {
  margin-top: calc(3vh);
  margin-left: calc(3vw);
  border: rgba(123, 133, 142, 0.745) 1px solid;
  background: rgba(238, 238, 238, 0.521);
  border-radius: 40px;
  width: calc(94vw);
  height: calc(94vh);
}
</style>

<script>
import qs from 'qs';
export default {
  data() {
    return {
      picHeader:'',
      picInfo:'',
      picData:'',
      str: this.$route.params.pictok
    }

  },
  methods: {
    init() {
      this.$axios({
        method: "post",
        url: "/app/get_graph_by_token",
        data: qs.stringify({
          // token: this.str.toString().split('localhost/')[1]
          token: this.str
        }),
      }).then((res) => {
        let retData = res.data.data;
        this.picHeader=retData.graph_name;
        this.picInfo=retData.graph_info;
        this.picData=retData.graph_data;
      })
    }
  },
  mounted() {
    this.init();
  }
}
</script>