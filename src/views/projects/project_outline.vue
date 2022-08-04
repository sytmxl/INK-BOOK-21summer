<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card shadow="never">
          <h1 style="text-align: left; margin-left: 2.5% ;margin-bottom: 1.5%; font-size: 30px">
            {{team_name}}::{{project_name}}
          </h1>
          <p style="text-align: left; margin-left: 2.5%;">
            {{team_intro}}
          </p>
        </el-card>
      </el-col>
    </el-row>
    <el-card shadow="never">
      <el-row>
        <el-col :span="24">
            <h1 style="text-align: left; margin-left: 2.5% ;margin-bottom: 1.5%">近期原型图</h1>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never">
      <el-row>
        <el-col :span="24">
            <h1 style="text-align: left; margin-left: 2.5% ;margin-bottom: 1.5%">近期UML</h1>
        </el-col>
        <el-col :span="5" v-for="(id, index) in UMLList" :key="id" :offset="index > 0 ? 2 : 0">
          <drawio-u-m-l :id = "id" :isdel = "viewingDel"/>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never">
      <el-row>
        <el-col :span="24">
            <h1 style="text-align: left; margin-left: 2.5% ;margin-bottom: 1.5%">近期文档</h1>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";
import DrawioUML from "@/components/drawioUML";

export default {
  components: {DrawioUML},
  name: "project_outline",
  beforeMount() {
    sessionStorage.setItem("project_id","1");
    this.get_uml_list();
  },
  methods:{
    get_uml_list(){
      this.$axios({
        method: "post" ,
        url: "app/get_graph_list" ,
        data: qs.stringify({
          type:0,
          isdeleted:false
        }),
      }).then(res => {
        this.$data.UMLList = res.data.slice(0, 3);
      })
    },
  },
  data() {
    return {
      project_id : sessionStorage.getItem("project_id"),
      team_name:"团队名称",
      team_intro:"团队介绍",
      project_name:"项目名称",
      UMLList:[],
    }
  }
}
</script>

<style scoped>

.el-card{
  margin-left: 2.5%;
  margin-right: 2.5%;
  margin-top: 1%;
}

</style>