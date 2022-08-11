<template>
  <el-container>
    <el-header>
      <h1>{{picHeader}}</h1>
      <p>{{picInfo}}</p>
    </el-header>
    <el-main>
      <img :src="picData" style="width: calc(75vw)">
    </el-main>
  </el-container>
</template>

<style scoped>
.h1 {
  font-size: 18px;
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