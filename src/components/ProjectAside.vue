<template>
  <el-menu
    background-color="rgb(240, 242, 245)"
    text-color="black"
    active-text-color="rgb(134, 143, 150)"
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    
    <div class="title" @click="goBack">
      <div class="back">
        &lt;&nbsp;
      </div>
      项目
    </div>
    <el-divider></el-divider>

    <div class="menu_base">
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
    </div>
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
          path: "../views/projects/project_outline.vue",
          name: "project_outline",
          label: "项目介绍",
          icon: "notebook-1",
        },
        {
          path: "../views/projects/project_design.vue",
          name: "project_design",
          label: "原型设计",
          icon: "bank-card",
        },
        {
          path: "../views/projects/project_paint.vue",
          name: "project_paint",
          label: "UML绘制",
          icon: "postcard",
        },
        {
          path: "../views/projects/project_word.vue",
          name: "project_word",
          label: "共享文档",
          icon: "document",
        },
      ],
    };
  },
  methods: {
    goBack(){window.location.href = "/team_projects"},
    handleOpen(key, keyPath) {
      
    },
    handleClose(key, keyPath) {
      
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
.el-menu-vertical-demo{
  width: 200px;
  min-height: 400px;
  padding: 0;
  height: 100%;
  animation-name: enter_aside;
  animation-iteration-count: 1;
  animation-duration: 0.4s;
}
.el-menu-item {
  float: left;
  outline: 1px;
  border-radius: 10px;
  margin: 8px;
  height: min-content;
  width: 184px;
  /* background-color: rgb(247, 250, 252) !important; */
  transition: 0.4s;
  text-align: left;
  z-index: 0;
}
.el-menu-item:hover {
  backdrop-filter: blur(3px) !important;

  background-color: rgba(150, 169, 183, 0.422) !important;
  color: rgb(255, 255, 255);
  width: 200px;
  margin: 20px;
  z-index: 1;
}
.el-menu-item:focus {
  background-color: rgb(150, 169, 183) !important;
  transition: 0.4s;
  color: rgb(255, 255, 255) !important;
  z-index: 1;
}
.selected, .selected:hover {
  background-color: rgb(150, 169, 183) !important;
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
.el-page-header {
  margin: 15px;
}
.title {
  font-size: 40px;
  font-weight: bolder;
  float: left;
  margin: 20px 0px 0px 30px;
  color: rgb(45, 52, 57);
  /* colorgb(5, 5, 6)55); */
  transition: 0.4s;
}
.title:hover {
  font-size: 50px;
  background-color: rgba(150, 169, 183, 0.14);
  border-radius: 20px;
  padding: 0px 10px 0px 10px;
  margin: 10px 0px 10px 10px;
}
.title:active {
  font-size: 50px;
  background-color: rgba(134, 143, 150, 0.42) !important;
  border-radius: 20px;
  padding: 0px 10px 0px 10px;
  margin: 10px 0px 10px 10px;
}
.back {
  font-size: 0px;
  transition: 0.4s;
  float: left;
}
.title:hover .back{
  font-size: 50px;
  float: left;
  }
.el-divider {
  margin-top: auto;
}
</style>