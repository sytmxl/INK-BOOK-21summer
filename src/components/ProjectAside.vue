<template>
  <el-menu
    background-color="rgb(240, 242, 245)"
    text-color="black"
    active-text-color="#2878ff"
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <el-menu-item
      v-for="item in noChildren"
      :index="item.path"
      :key="item.path"
      :route="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      v-for="item in hasChildren"
      :index="item.path"
      :key="item.path"
      :route="item.path"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subItem) in item.children"
        :key="subItem.path"
        :route="subItem.path" 
      >
        <el-menu-item :index="subItem.path" @click="clickMenu(subItem)" > <i :class="'el-icon-' + subItem.icon"></i>{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "ProjectAside",
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          path: "../views/projects/project_firstpage.vue",
          name: "project_firstpage",
          label: "项目介绍",
          icon: "view",
        },
        {
          path: "../views/projects/project_design.vue",
          name: "project_design",
          label: "原型设计",
          icon: "s-opportunity",
        },
        {
          path: "../views/projects/project_paint.vue",
          name: "project_paint",
          label: "UML绘制",
          icon: "s-promotion",
        },
        {
          path: "../views/projects/project_word.vue",
          name: "project_word",
          label: "共享文档",
          icon: "edit",
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      this.$router.push({
        name: item.name,
      }); //多传入一个params可以用来传参，用$route.params.元素名 可以来拿到元素信息
    },
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  padding: 0;
  height: 100%;
  background-color: rgb(73, 105, 160);
}
.el-menu-item {
  float: left;
  outline: 1px;
  border-radius: 10px;
  margin: 8px;
  height: min-content;
  width: 184px;
  background-color: aliceblue;
  transition: 0.5s;
  z-index: 0;
}
.el-menu-item:hover {
  background-color: aliceblue;
  width: 250px;
  margin: 20px;
  z-index: 0;
}
.el-menu i{
  font-size: 15px;
}
.el-menu span{
  font-size: 15px;
}

.el-submenu .el-menu-item{
  font-size: 15px;
}
</style>