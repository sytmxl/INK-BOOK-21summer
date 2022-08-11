<template>
  <el-container>
    <el-header>
      <span>
        <h1>分享文件：{{picHeader}}</h1>
        <p>{{picInfo}}</p>
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
  color: rgba(114, 132, 145, 0.64);
}
img {
  max-width: calc(90vw);
  max-height: calc(90vh);
}
.el-container {
  border: rgb(238, 238, 238) 1px solid;
  background: rgb(238, 238, 238);
  border-radius: 40px;
  width: calc(95vw);
  height: calc(95vh);
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