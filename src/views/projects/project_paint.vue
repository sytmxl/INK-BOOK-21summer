<template>
  <div id="init">
    <el-container>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-plus"></i>
            <span slot="title">新建表</span>
          </template>
          <el-menu-item-group>
            <span slot="title">新建UML</span>
            <el-menu-item index="1-1">空画布</el-menu-item>
            <el-menu-item index="1-2">用例图示例</el-menu-item>
            <el-menu-item index="1-3">类图示例</el-menu-item>
            <el-menu-item index="1-4">包图示例</el-menu-item>
            <el-menu-item index="1-5">顺序图示例</el-menu-item>
            <el-menu-item index="1-6">协作图示例</el-menu-item>
            <el-menu-item index="1-7">状态图示例</el-menu-item>
            <el-menu-item index="1-8">活动图示例</el-menu-item>
            <el-menu-item index="1-9">构件图示例</el-menu-item>
            <el-menu-item index="1-10">部署图示例</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">管理</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-delete"></i>
          <span slot="title">回收站</span>
        </el-menu-item>
      </el-menu>

      <el-row>
        <el-col :span="7" v-for="(o, index) in 9" :key="o" :offset="index > 0 ? 1 : 0">
          <drawio-u-m-l/>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>
  
<script>
import DrawioUML from "@/components/drawioUML";
export default {
  components: {DrawioUML}
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
  z-index: 0;
}
</style>