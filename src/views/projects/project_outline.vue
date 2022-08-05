<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-card shadow="never">
          <h1 style="text-align: left; margin-left: 2.5% ;margin-bottom: 1.5%; font-size: 30px">
            {{team_name}}/{{project_name}}
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
      <el-row>
        <el-col :span="5" v-for="(id, index) in PrototypeList" :key="id" :offset="index > 0 ? 2 : 0">
          <drawio-digram v-on:deled = "get_prototype_list" :graph_id = "id" :isdel = "viewingDel" @deled = "updateOnDel"/>
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="never">
      <el-row>
        <el-col :span="24">
            <h1 style="text-align: left; margin-left: 2.5% ;margin-bottom: 1.5%">近期UML</h1>
        </el-col>
        <el-row>
          <el-col :span="5" v-for="(id, index) in UMLList" :key="id" :offset="index > 0 ? 2 : 0">
            <drawio-digram v-on:deled = "get_uml_list" :graph_id = "id" :isdel = "viewingDel"/>
          </el-col>
        </el-row>
      </el-row>
    </el-card>
    <el-card shadow="never">
      <el-row>
        <el-col :span="24">
            <h1 style="text-align: left; margin-left: 2.5% ;margin-bottom: 1.5%">近期文档</h1>
        </el-col>
      </el-row>
      <el-row >
        <el-col :span="7" v-for="item in doc_list">
          <EtherpadFile v-on:deled = "get_doc_list" :id = "item.doc_id" :title="item.doc_name" :last_edit_time="item.update_time"/>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";
import drawioDigram from "@/components/drawioDiagram";
import EtherpadFile from "@/components/etherpadFile";

export default {
  components: {drawioDigram,EtherpadFile},
  name: "project_outline",
  beforeMount() {
    sessionStorage.setItem("project_id","1");
    this.refresh();
  },
  methods:{
    refresh(){
      this.get_uml_list();
      this.get_prototype_list();
      this.get_doc_list();
      },
    get_prototype_list(){
      this.$data.PrototypeList = []
      this.$axios({
        method: "post" ,
        url: "get_graph_list" ,
        data: qs.stringify({
          project_id:this.$data.project_id,
          type:1,
          isdeleted:"0"
        }),
      }).then(res => {
        let graph_list = res.data.data.graph_list

        this.$data.PrototypeList = [];
        let i;
        for(i in graph_list){
          //console.log(graph_list[i].graph_id)
          this.$data.PrototypeList.push(graph_list[i].graph_id);
        }
        this.$data.PrototypeList = this.$data.PrototypeList.slice(0,3);
      })
    },
    get_uml_list(){
      this.$data.UMLList = [];
      this.$axios({
        method: "post" ,
        url: "get_graph_list" ,
        data: qs.stringify({
          project_id:this.$data.project_id,
          type:0,
          isdeleted:"0"
        }),
      }).then(res => {
        let graph_list = res.data.data.graph_list

        this.$data.UMLList = [];
        let i;
        for(i in graph_list){
          //console.log(graph_list[i].graph_id)
          this.$data.UMLList.push(graph_list[i].graph_id);
        }
        this.$data.UMLList =this.$data.UMLList.slice(0,3);
      })
    },
    get_doc_list(){
      this.$axios({
        method: "post" ,
        url: "get_doc_list" ,
        data: qs.stringify({
          project_id:this.$data.project_id,
        }),
      }).then(res=>{
        console.log(res.data.data)
        let resData = res.data.data;
        this.$data.doc_list = resData.doc_normal_list.slice(0,3);
        console.log(this.$data.doc_list)
      })
    },
  },
  data() {
    return {
      project_id : JSON.parse(sessionStorage.getItem("project")).project_id,
      team_name: JSON.parse(sessionStorage.getItem("team")).team_name,
      team_intro: sessionStorage.getItem(""),
      project_name: JSON.parse(sessionStorage.getItem("project")).project_name,
      UMLList:[],
      PrototypeList:[],
      doc_list:[],
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