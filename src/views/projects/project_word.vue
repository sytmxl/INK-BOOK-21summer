<template>
  <div id="init">
    <el-dialog
        title="新建一个共享文档"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="closeDialog">
      <span>
          <el-row>
            <el-col :span="4">
              文档标题：
            </el-col>
            <el-col :span="20">
              <el-input
                  placeholder="请输入标题"
                  v-model="newDocName">
              </el-input>
            </el-col>
          </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="add_doc">新建</el-button>
      </span>
    </el-dialog>
    <el-container>
      <div>
        <el-menu width=65px default-active="1-4-1" class="el-menu-vertical-demo" collapse="true" >

          <el-menu-item class="outside" index="2">
            <i class="el-icon-plus" @click="dialogVisible = true"></i>
            <span slot="title">新建表</span>
          </el-menu-item>
          <el-menu-item class="outside" index="2">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">管理</span>
          </el-menu-item>
          <el-menu-item class="outside" index="3" @click="enter_exit_Recycle">
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
        <el-row   v-if="inRecycle == false">
          <el-col :span="7" v-for="item in doc_list">
            <EtherpadFile v-on:deled="get_doc_list" :in-recycle="false"
                          :id = "item.doc_id" :title="item.doc_name" :last_edit_time="item.update_time" :url="item.doc_url"
            />
          </el-col>
        </el-row>
        <el-row v-if="inRecycle == true">
          <el-col :span="7" v-for="item in recycle_list">
            <EtherpadFile v-on:deled="get_doc_list" :in-recycle="true"
                          :id = "item.doc_id" :title="item.doc_name" :last_edit_time="item.update_time" :url="item.doc_url"/>
          </el-col>
        </el-row>
      </div>
    </el-container>
  </div>
</template>

<script>
import EtherpadFile from "../../components/etherpadFile.vue";
import qs from "qs";
export default {
  inject: ["reload"],

  components: { EtherpadFile },
  beforeMount() {
    this.get_doc_list();
  },
  data() {
    return {
      dialogVisible : false,
      inRecycle : false,
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
      doc_list : [],
      recycle_list : [],
      project_id : JSON.parse(sessionStorage.getItem("project")).project_id,
      newDocName : ''
    };
  },
  methods:{
    updateOnDel(){
      this.get_doc_list(this.$data.inRecycle);
    },
    enter_exit_Recycle(){
      this.$data.inRecycle = ! this.$data.inRecycle
    },
    openDialog(){
      this.$data.dialogVisible = false
    },
    closeDialog(){
      this.$data.dialogVisible = false
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
        this.$data.doc_list = resData.doc_normal_list;
        this.$data.recycle_list = resData.doc_recycle_list;
      })
    },
    async add_doc(){
      if(this.$data.newDocName == null || this.$data.newDocName == '' ){
        this.$message({
          message: '文档标题不能为空',
          type: 'warning'
        });
        return;
      }
      await this.$axios({
        method: "post" ,
        url: "create_doc" ,
        data: qs.stringify({
          doc_name : this.$data.newDocName,
          project_id : this.$data.project_id,
        }),
      })
      this.$data.dialogVisible = false;
      this.$message({
        message: '文档\"'+this.$data.newDocName+'\"新建成功',
        type: 'success'
      });
      await this.get_doc_list();
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