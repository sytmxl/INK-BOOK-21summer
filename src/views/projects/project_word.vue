<template>
  <div id="init">
    <el-row>
      <el-col :span="7" v-for="item in menu">
        <EtherpadFile  v-for="item in menu" :title="item.label"/>
      </el-col>
    </el-row>
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
    margin:20px auto;
    color:blueviolet;
    font-size: large;
    font-weight: bold;
}
.el-col {
  margin: 22px;
}
</style>