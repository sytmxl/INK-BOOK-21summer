<template>
  <div id="init">
    <el-container>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" collapse="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-plus"></i>
            <span slot="title">新建表</span>
          </template>
          <el-menu-item-group>
            <span slot="title">新建原型设计</span>
            <el-menu-item index="1-1">空画布</el-menu-item>
            <el-menu-item index="1-2">移动端设计原型</el-menu-item>
            <el-menu-item index="1-3">网络端设计原型</el-menu-item>
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
          <el-col :span="7" v-for="(o, index) in 9" :key="o" >
            <drawio-prototype/>
          </el-col>
        </el-row>
    </el-container>
  </div>
</template>

<script>
import drawioPrototype from "@/components/drawioPrototype";
export default {
  components: {drawioPrototype},
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
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>