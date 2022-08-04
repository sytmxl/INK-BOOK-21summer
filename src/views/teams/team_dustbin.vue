<template>
    <el-container>
        <div class="main" v-if="teamname">
            
      <div class="all">
      <h1 class="label">全部项目</h1>
      <div v-for="(item,index) in project_list" :key="item">
        <el-card class="box-card" shadow="hover" v-if="index%2==0">
          <h5>{{item.project_name}}</h5>
          <p>创建时间：{{item.create_time}}</p>
          <p>删除时间：{{item.update_time}}</p>
          <div class="bottom">
          <el-button type="success" icon="el-icon-check"  title="恢复项目" @click="restore(item.project_id)">恢复项目</el-button>
          <el-button type="danger" icon="el-icon-delete"  title="删除项目" @click="deleteforever(item.project_id)">删除项目</el-button>
          </div>
            
      </el-card>
      <el-card class="box-card2" shadow="hover" v-else>
        <h5>{{item.project_name}}</h5>
          <p>创建时间：{{item.create_time}}</p>
          <p>删除时间：{{item.update_time}}</p>
          <div class="bottom">
          <el-button type="success" icon="el-icon-check"  title="恢复项目" @click="restore(item.project_id)">恢复项目</el-button>
          <el-button type="danger" icon="el-icon-delete"  title="删除项目" @click="deleteforever(item.project_id)">删除项目</el-button>
          </div>
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
    width: 510px;
    height: 300px;
    margin-left: 50px;
    margin-top: 50px;
    border-radius: 15px;
    text-align: left;
    padding: 20px;
    float: left;
    border-color: rgb(206, 218, 226) 2px;
    margin-bottom: 50px;
  }
    .box-card2{
    width: 510px;
    height: 300px;
    margin-left: 50px;
    margin-top: 50px;
    border-radius: 15px;
    text-align: left;
    padding: 20px;
    float: left;
    border-color: rgb(206, 218, 226) 2px;
    margin-bottom: 50px;
  }
  .label {
    margin: 20px 0px 0px 50px !important;
    font-size: 50px;
    float: left;
    width: 100%;
    color: rgb(114, 132, 145);
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
        url: "/app/get_project_list",
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
        this.$axios({
        method: "post",
        url: "/app/recycle_project",
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
      },
      deleteforever(id){
        this.$axios({
             method: "post",
             url: "/app/permanent_del_project",
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
      }
    },
    mounted(){
      this.init();
    }
}
</script>