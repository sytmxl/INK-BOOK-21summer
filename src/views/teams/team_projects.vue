<template>
<el-container>
  <div class="main" v-if="teamname">

    <div class="add" @click="addproject()">
      <i class="el-icon-plus" style="font-size:20px" @click="addmember()" title="添加新成员"></i>
    </div>

    <div class="recent" v-if="project_list.length!=0">
      <h1 class="label label_top">近期项目</h1>
      <div class="content">
        <div v-for="i in 4" :key="i">
          <el-card class="box-card" shadow="hover" v-if="project_list[project_list.length-i]">
            <div id="tools">
              <i class="el-icon-delete" @click="deleteproject(project_list[project_list.length-i].project_id)"></i>
              <i class="el-icon-edit-outline" @click="information(project_list[project_list.length-i])"></i>
            </div>
              <h5>{{project_list[project_list.length-i].project_name}}<i class="el-icon-edit" style="font-size:20px" @click="changename(project_list[project_list.length-i].project_id)" title="重命名" ></i></h5>
              <p>创建时间：<br/>{{project_list[project_list.length-i].create_time}}</p>
              <p>最近修改时间：<br/>{{project_list[project_list.length-i].update_time}}</p>
          </el-card>   
        </div>
      </div>
    </div>

    <div class="recent" v-else>
      <h1 class="label">近期项目</h1>
      <div class="chooseteam">
        <el-empty description="你尚无项目，快去新建一个吧" :image-size="200">
        </el-empty>
      </div>
    </div>

    <div class="all" v-if="project_list.length!=0">
      <h1 class="label">全部项目</h1>
      <div v-for="(item,index) in project_list" :key="item">
        <el-card class="box-card" shadow="hover">
          <div id="tools">
            <i class="el-icon-delete" @click="deleteproject(item.project_id)"></i>
            <i class="el-icon-edit-outline" @click="information(item)"></i>
          </div>
          
          <h5>{{item.project_name}}<i class="el-icon-edit" style="font-size:20px" @click="changename(item.project_id)" title="重命名" ></i></h5>
          <p>创建时间：<br/>{{item.create_time}}</p>
          <p>最近修改时间：<br/>{{item.update_time}}</p>
        </el-card>
      </div>
    </div>
  </div>
  <div class="chooseteam" v-else>
    <el-empty description="你还有没选择你的团队，快去选择一个吧" :image-size="200"></el-empty>
  </div>
</el-container>
 
</template>

<script>
import qs from 'qs';
export default {
  inject:["reload"],
  data(){
    return{
      teamname:JSON.parse(sessionStorage.getItem('team')).team_name,
      project_list:[]
    }
    
  },
   methods:{
      changename(id){
        console.log(id);
         this.$prompt('请输入新的项目名称', '修改项目名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
          console.log(888);
          console.log(value);
          this.$axios({
        method: "post",
        url: "rename_project",
        data: qs.stringify({
          project_id: id,
          project_name: value
        }),
      })
        .then((res) => {
        
         this.reload();
          
          })
        .catch((err) => {
          console.log(err); 
        });
        }).catch(() => {
              
        });
      },
      addproject(){
         this.$prompt('请输入新项目名', '新建项目', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$axios({
        method: "post",
        url: "create_project",
        data: qs.stringify({
          team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
          project_name: value
        }),
      })
        .then((res) => {
         
         var project = {project_id:res.data.data.project_id, project_name:value};
         this.$store.dispatch("saveproject", project);
         location.href = "/project_outline"
        })
        .catch((err) => {
          console.log(err); 
        });
        }).catch(() => {
              
        });
      },
      deleteproject(id){

         this.$confirm('此操作将将项目移至回收站, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        
          this.$axios({
        method: "post",
        url: "del_project",
        data: qs.stringify({
          project_id: id,
        }),
      })
        .then((res) => {
          if(res.data.errno ==0){
            this.$message.success(res.data.msg);
          }
          else{
            this.$message.warning(res.data.msg);
          }
          this.reload();
       
        })
        .catch((err) => {
          console.log(err); 
        });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

        
      },
      information(item){
        var project = {project_id:item.project_id, project_name:item.project_name};
        this.$store.dispatch("saveproject", project);
        location.href = "project_outline";
      },
      init(){
         this.$axios({
        method: "post",
        // headers: { "authorization": JSON.parse(sessionStorage.getItem('token')) },
        url: "get_project_list",
        data: qs.stringify({
          team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
        }),
      })
        .then((res) => {
          
          console.log(666)
         this.project_list = res.data.data.project_normal_list;
         console.log(this.project_list)
        })
        .catch((err) => {
          console.log(err); 
        });
      }
    },
    mounted(){
      this.init();
    }
}
</script>

<style scoped>
  .chooseteam{
    position: absolute;
    left: 0;
    right: 0;
  }
  .el-icon-plus:hover{
     cursor: pointer;
  }
  
   .main{
    width: 100%;
  }
  .recent{
    width: 100%;
    text-align: left;
    font-size: 36px;
    /* height: 800px; */
  }
  .all{
    width: 100%;
    text-align: left;
    font-size: 36px;
  }
  .all h1{
    margin-top: 20px;
  }
  .content{
    margin-top: 20px;
  }
  .el-icon-edit{
    cursor: pointer;
    margin-left: 5px;
  }
  .box-card p{
    font-size: 18px;
    margin-top: 15px;
  }
  .bottom{
    margin-top: 100px;
  }
  .bottom .el-button{
    border-radius: 20px;
    margin-left: 85px;
  }
  .add{
    width: 62px;
    border-radius: 20px;
    
    /* background: linear-gradient(270.6deg, #cbcddb06 -8.4%, rgba(150, 169, 183, 0.422) 100%); */
    background-color: rgb(206, 218, 226);
    font-size: 36px;
    color: black;
    text-align: center;
    
    overflow: hidden;
    transition: 0.2s;
    padding-bottom: 10px;
    float: right;
    left: 93%;
    position: fixed;
    z-index: 1;
    top: 100px;
  }
  .add:hover {
    width: 62px;
    border-radius: 50%;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 10px rgba(0, 0, 0, 0.04);
  }
  .box-card{
    width: 280px;
    height: 220px;
    margin: 15px;
    border-radius: 15px;
    text-align: left;
    padding: 0px;
    float: left;
    /* border-color: rgb(206, 218, 226) 2px; */
    transition: 0.5s;
  }
  /* .box-card:hover{
    width: 290px;
    height: 230px;
    margin: 10px;
  } */
  /* 这个悬浮效果会有一点显示bug 暂且放着吧 */
  .label {
    margin: 30px 0px 0px 30px;
    font-size: 50px;
    float: left;
    width: 100%;
    color: rgb(114, 132, 145); 
  }
  .label_top{
    margin: 10px 0px 0px 30px !important;
  }
  

#tools {
  background-color: rgb(157, 162, 176);
  color: rgba(0, 0, 0, 0);
  transition: 0.5s;
  height: 0px;
  padding: 0px;
  font-size: 0px;
  border-radius: 5px;
  text-align: center;
}

.box-card:hover #tools{
  height: 40px;
  color: rgb(0, 0, 0);
  font-size: 30px;
  margin-bottom: 20px;
}

.el-icon-delete, .el-icon-edit-outline, .el-icon-document-delete, .el-icon-magic-stick {
  color: rgb(247, 239, 239);
  border-radius: 5px;
  padding: 0px;
  transition: 0.2s;
  width: 30%;
}
.el-icon-delete:hover, .el-icon-edit-outline:hover, .el-icon-document-delete:hover, .el-icon-magic-stick:hover{
  color: rgb(247, 239, 239);
  border-radius: 10px;
  width: 40%;
}
.el-icon-delete:hover {
  background-color: rgb(199, 113, 113);
}
.el-icon-edit-outline:hover {
  background-color: rgb(113, 142, 199);
}
.el-icon-document-delete:hover {
  background-color: rgb(199, 113, 113);
}
.el-icon-magic-stick:hover {
  background-color: rgb(113, 199, 130);
}
.box-card:hover .el-icon-delete, .el-icon-edit-outline, .el-icon-document-delete, .el-icon-magic-stick {
  /* background-color: rgb(199, 113, 113); */
  padding: 5px;
}
.box-card h5 {
  display: inline-block;
  white-space: nowrap; 
  width: 100%; 
  overflow: hidden;
  text-overflow:ellipsis;
  transition: 0.5s;
}
.box-card:hover h5{
  white-space:unset; 
  text-overflow: unset;
  font-size: 25px;
}
</style>