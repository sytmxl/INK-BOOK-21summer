<template>
  <el-menu
    background-color="rgb(240, 242, 245)"
    text-color="black"
    active-text-color="rgb(134, 143, 150)"
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
  name: "TeamAside",
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          path: "../views/teams/team_outline.vue",
          name: "team_outline",
          label: "团队情况",
          icon: "setting",
        },
        {
          path: "../views/teams/team_members.vue",
          name: "team_members",
          label: "成员管理",
          icon: "user",
        },
        {
          path: "../views/teams/team_projects.vue",
          name: "team_projects",
          label: "项目管理",
          icon: "goods",
        },
        {
        path: '/team_filecenter',
        name: 'team_filecenter',
        label: "文档中心",
        icon: "folder"
        },
        {
          path: "../views/teams/team_dustbin.vue",
          name: "team_dustbin",
          label: "回收站",
          icon: "delete",
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
  transition: 0.4s;
  z-index: 1;
  text-align: left;
}
.el-menu-item:hover {
  backdrop-filter: blur(3px) !important;

  background-color: rgba(150, 169, 183, 0.422) !important;
  color: rgb(255, 255, 255);
  width: 200px;
  margin: 20px;
  z-index: 1;
}
.el-menu-item:active {
  background-color: rgba(134, 143, 150, 0.42) !important;
  transition: 0.2s;
  color: rgb(255, 255, 255) !important;
  z-index: 1;
}
.el-menu-item:focus {
  background-color: rgb(150, 169, 183) !important;
  transition: 0.4s;
  color: rgb(255, 255, 255) !important;
  z-index: 1;
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