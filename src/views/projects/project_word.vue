<template>
  <div id="init">
    <el-container>
      <div>
        <el-menu width=65px default-active="1-4-1" class="el-menu-vertical-demo" collapse="true" >

          <el-menu-item class="outside" index="2">
            <i class="el-icon-plus"></i>
            <span slot="title">新建表</span>
          </el-menu-item>
          <el-menu-item class="outside" index="2">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">管理</span>
          </el-menu-item>
          <el-menu-item class="outside" index="3">
            <i class="el-icon-delete"></i>
            <span slot="title">回收站</span>
          </el-menu-item>
          <el-submenu class="outside" index="1">
            <template slot="title">
              <i class="el-icon-plus"></i>
              <span slot="title">排版占位不可见</span>
            </template>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right">
        <el-row>
          <el-col :span="7" v-for="item in menu">
            <EtherpadFile :title="item.label"/>
          </el-col>
        </el-row>
      </div>
    </el-container>
  </div>
</template>

<script>
import EtherpadFile from "../../components/etherpadFile.vue";
export default {
  components: { EtherpadFile },
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          path: "../views/teams/team_outline.vue",
          name: "team_outline",
          label: "mosy",
          icon: "setting",
        },
        {
          path: "../views/teams/team_members.vue",
          name: "team_members",
          label: "mosyy",
          icon: "user",
        },
        {
          path: "../views/teams/team_projects.vue",
          name: "team_projects",
          label: "mosyyy",
          icon: "goods",
        },
        {
          path: "../views/teams/team_projects.vue",
          name: "team_projects",
          label: "mosyyyy",
          icon: "goods",
        },
      ],
    };
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
.right {
  margin-left: 80px;
}
.el-col {
  margin: 22px;
  width: 360px;
}
.el-menu--collapse{
  float: top;
  background-color: rgb(255, 255, 255) !important;
  width: 65px !important;
  position: fixed;
  height: 1000px;
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
  margin: 15px 0px 15px 5px;
  border: 5px;
  border-radius: 90px;
  background-color: rgba(150, 169, 183, 0.422) !important;
}

.el-row {
  margin-left: 20px;
}

.el-submenu {
  visibility: hidden;
}
</style>