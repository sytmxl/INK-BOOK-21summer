<template>
  <div id="init">
    <el-container>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" collapse="true">
        <el-submenu class="outside" index="1">
          <template slot="title">
            <i class="el-icon-plus"></i>
            <span slot="title">新建表</span>
          </template>
          <el-menu-item-group>
            <span slot="title">新建UML</span>
            <el-menu-item class="inside" index="1-1" @click="add_graph(0)">空画布</el-menu-item>
            <el-menu-item class="inside" index="1-2" @click="add_graph(0)">用例图示例</el-menu-item>
            <el-menu-item class="inside" index="1-3" @click="add_graph(0)">类图示例</el-menu-item>
            <el-menu-item class="inside" index="1-4" @click="add_graph(0)">包图示例</el-menu-item>
            <el-menu-item class="inside" index="1-5" @click="add_graph(0)">顺序图示例</el-menu-item>
            <el-menu-item class="inside" index="1-6" @click="add_graph(0)">协作图示例</el-menu-item>
            <el-menu-item class="inside" index="1-7" @click="add_graph(0)">状态图示例</el-menu-item>
            <el-menu-item class="inside" index="1-8" @click="add_graph(0)">活动图示例</el-menu-item>
            <el-menu-item class="inside" index="1-9" @click="add_graph(0)">构件图示例</el-menu-item>
            <el-menu-item class="inside" index="1-10"@click="add_graph(0)">部署图示例</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item class="outside" index="2">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">管理</span>
        </el-menu-item>
        <el-menu-item class="outside" index="3">
          <i class="el-icon-delete"></i>
          <span slot="title">回收站</span>
        </el-menu-item>
        <el-menu-item class="outside" index="4" @click="test">
        <i class="el-icon-cpu"></i>
        <span slot="title">测试</span>
      </el-menu-item>
      </el-menu>

      <el-row>
        <el-col :span="7" v-for="(id, index) in UMLList" :key="id" :offset="index > 0 ? 1 : 0">
          <drawio-u-m-l :id = "id"/>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>
  
<script>
import DrawioUML from "@/components/drawioUML";
import qs from "qs";
export default {
  components: {DrawioUML},
  beforeMount() {
    this.get_list();
  },
  methods:{
    test(){
      this.get_list();
    },
    get_list(){
      this.$axios({
        method: "post" ,
        url: "http://127.0.0.1:4523/m1/1379703-0-default/getgraphlist" ,
        data: qs.stringify({
          type:0,
          isdeleted:false
        }),
      }).then(res => {
        console.log(res.data)
        this.$data.UMLList = res.data
      })
    },
    add_graph(template) {
      this.$axios({
        method: "post" ,
        url: "http://127.0.0.1:4523/m1/1379703-0-default/newgraph" ,
        data: qs.stringify({
          type:0,
          template:template
        }),
      }).then(res => {
        console.log(res.data)
        this.$data.UMLList.push(res.data)
        console.log(this.$data.UMLList)
      })
    }
  },
  data() {
    return {
      UMLList:[]
    }
  }
}
</script>

<style scoped>
#init{
    margin:0px auto;
    color:blueviolet;
    font-size: large;
    font-weight: bold;
}
.el-col {
  margin: 22px;
  width: 360px;
  /* background-color: beige; */
  z-index: 0;
}
.el-menu-vertical-demo {
  float: top;
  background-color: rgb(255, 255, 255) !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;

}
.el-container {
  padding-top: 0%;
  margin-top: 0%;
}

.inside {
  transition: 0.5s;
}
.inside:hover {
  margin: 15px 10px 8px 10px;
  border-radius: 15px;
}
.outside {
  transition: 0.5s;
}
.outside:hover {
  margin: 15px 0px 15px 0px;
  border: 5px;
  border-radius: 90px;
}
</style>