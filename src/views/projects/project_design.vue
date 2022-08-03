<template>
  <div id="init">
    <el-container>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" collapse="true" >
        <el-submenu class="outside" index="1">
          <template slot="title">
            <i class="el-icon-plus"></i>
            <span slot="title">新建表</span>
          </template>
          <el-menu-item-group>
            <span slot="title">新建原型设计</span>
            <el-menu-item class="inside" index="1-1">空画布</el-menu-item>
            <el-menu-item class="inside" index="1-2">移动端设计原型</el-menu-item>
            <el-menu-item class="inside" index="1-3">网络端设计原型</el-menu-item>
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
      </el-menu>

        <el-row>
          <el-col :span="7" v-for="(o, index) in 9" :key="o" >
            <drawio-prototype/>
          </el-col>
        </el-row>
    </el-container>
  </div>
</template>

<script>
import drawioPrototype from "@/components/drawioPrototype";
import qs from "qs";
export default {
  components: {drawioPrototype},
  methods:{
    add_graph(template){
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/newgraph" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          type : 0,
          template : template
        }),
      })
    },
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
  /* background-color: beige; */
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

.el-menu--popup{
  background-color: rgb(238, 196, 196);
  border-radius: 20px !important;
}
</style>