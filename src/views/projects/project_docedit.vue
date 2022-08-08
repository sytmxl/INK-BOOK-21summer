<template>
  <div>
    <etherpad-file/>
    <el-input v-model="input" placeholder="console"></el-input>
    <el-button @click="newPad">新建测试</el-button>
    <el-button @click="getText">获取内容</el-button>
    <el-button @click="getPadList">获取pad列表</el-button>
    <el-button @click="setPadUrl">iframe</el-button>
    <iframe :src="docUrl" width=600 height=400></iframe>
    <p>{{content}}</p>

  </div>


</template>

<script>
import EtherpadFile from "@/components/etherpadFile";
import {apikey} from "@/scripts/apikey";
export default {
  name: "project_docedit",
  components: {EtherpadFile},
  methods:{
    newPad(){
      this.axios({
        method:"post",
        url:"api/1.2.1/createPad",
        params:{
          apikey:apikey,
          padID:this.$data.input,
          text:'test'
        }
      });
      this.axios({
        method:"post",
        url:"api/1/setText",
        params:{
          apikey:apikey,
          padID:this.$data.input,
          text:'test'
        }
      });
    },
    getText(){
      this.axios({
        method:"post",
        url:"api/1/getText",
        params:{
          apikey:apikey,
          padID:this.$data.input,
        }
      }).then(res=>{
        this.$data.content = res.data;
      })
    },
    getPadList(){
      this.axios({
        method:"post",
        url:"api/1.2.1/listAllPads",
        params:{
          apikey:apikey,
        }
      }).then(res=>{
        this.$data.content = res.data;
      })
    },
    setPadUrl(){
      this.$data.docUrl = 'http://43.138.67.29:9001/p/' + this.$data.input;
    }
  },
  data() {
    return {
      content:'n/a',
      input:'',
      docUrl:''
    }
  }
}
</script>

<style scoped>

</style>