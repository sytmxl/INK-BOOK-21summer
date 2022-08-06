<template>
    <el-container>
        <div class="main" v-if="teamname">
            
      <div class="all">
      <h1 class="label">回收站</h1>
      <div v-for="(item,index) in project_list" :key="item">
        <el-card class="box-card" shadow="hover">
          <div id="tools">
          <i class="el-icon-document-delete" @click="deleteforever(item.project_id)"></i>
          <i class="el-icon-magic-stick" @click="restore(item)"></i>
          </div>
          <h5>{{item.project_name}}</h5>
          <p>创建时间：<br/>{{item.create_time}}</p>
          <p>删除时间：<br/>{{item.update_time}}</p>

      </el-card>
      </div>
    </div>
        </div>
         <div class="chooseteam" v-else>
            <el-empty description="你还有没选择你的团队，快去选择一个吧" :image-size="200"></el-empty>
        </div>
    </el-container>
</template>

<style scoped>
  .chooseteam{
    position: absolute;
    left: 0;
    right: 0;
  }
  .title{
    height: 150px;
    width: 100%;
    background: linear-gradient(270.6deg, #e3f6fd -8.4%, #f6faff 100%);
    font-size: 36px;
    color: black;
    text-align: left;
    line-height: 60px;
    border-radius: 10px;
  }
  .title h1{
    margin-left: 50px;
    margin-top: 20px;
  }
   .main{
    width: 100%;
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
   .box-card2 p{
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
  .box-card{
    width: 280px;
    /* width: fit-content; */
    height: 220px;
    margin-left: 30px;
    margin-top: 30px;
    border-radius: 15px;
    text-align: left;
    padding: 0px;
    float: left;
    border-color: rgb(206, 218, 226) 2px;
    margin-bottom: 50px;
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
  .label {
    margin: 20px 0px 0px 50px !important;
    font-size: 50px;
    float: left;
    width: 100%;
    color: rgb(114, 132, 145);
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

<script>
import qs from 'qs';
export default {
    data(){
        return{
            teamname:JSON.parse(sessionStorage.getItem('team')).team_name,
            project_list:[]
        }
    },
    methods:{
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
         this.project_list = res.data.data.project_recycle_list;
        })
        .catch((err) => {
          console.log(err); 
        });
      },
      restore(id){

         this.$confirm('此操作将恢复该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          this.$axios({
        method: "post",
        url: "recycle_project",
        data: qs.stringify({
          project_id: id,
        }),
      })
        .then((res) => {
         this.$message.success("恢复成功");
         location.reload();
        })
        .catch((err) => {
          console.log(err); 
        });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消恢复'
          });          
        });



        
      },
      deleteforever(id){



         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          this.$axios({
             method: "post",
             url: "permanent_del_project",
             data: qs.stringify({
               project_id: id,
             }),
        })
            .then((res) => {
             this.$message.success("已经彻底删除");
             location.reload();
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



        
      }
    },
    mounted(){
      this.init();
    }
}
</script>