<template>
    <el-container>
        <div class="main" v-if="teamname">
            <div class="title" >
                    <h1> ~(～￣▽￣)～ <br>不小心删掉的项目可以在这里恢复哦</h1>
            </div>
            <div class="all">
      <h1>全部项目</h1>
      <div v-for="(item,index) in project_list" :key="item">
        <el-card class="box-card" shadow="hover" v-if="index%2==0">
          <h5>{{item.project_name}}</h5>
          <p>创建时间：{{item.project_setup}}</p>
          <p>删除时间：{{item.project_modify}}</p>
          <div class="bottom">
          <el-button type="success" icon="el-icon-check"  title="恢复项目">恢复项目</el-button>
          <el-button type="danger" icon="el-icon-delete"  title="删除项目">删除项目</el-button>
          </div>
            
      </el-card>
      <el-card class="box-card2" shadow="hover" v-else>
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
  .box-card {
    width: 550px;
    height: 300px;
    float: left;
    margin-left: 50px;
    margin-top: 50px;
    border-radius: 15px;
    text-align: left;
    border-color: skyblue;
  }
    .box-card2 {
    width: 550px;
    height: 300px;
    float: right;
    margin-right: 50px;
    margin-top: 50px;
    border-radius: 15px;
    text-align: left;
    border-color: skyblue;
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
</style>

<script>
import qs from 'qs';
export default {
    data(){
        return{
            teamname:JSON.parse(sessionStorage.getItem('team')).team_name,
            project_list:[
              {project_name:'小学期前端',project_setup:'2022.08.01 14：35',project_modify:'2022.08.03 15：25'}
            ]
        }
    }
}
</script>