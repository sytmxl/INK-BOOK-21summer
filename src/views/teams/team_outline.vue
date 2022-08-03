<template>
    <el-container>
     
     <div class="main" v-if="teamname">
       <div class="teamname" >
          <h1>╰(￣▽￣)╭ <br>这里是"{{teamname}}"的团队概况  <i class="el-icon-edit" style="font-size:20px" @click="changename()" title="重命名">修改团队名称</i></h1>
        </div>

        <div class="content">

              <el-card class="box-card">
                <div  class="text item name">
                  <span class="og">团队名称：</span>
                  {{teamname}}
                   
                </div>
                <div  class="text item type">
                  <span class="og">团队类型：</span>
                  {{teamtype}}
                </div>
                 <div  class="text item setter">
                  <span class="og">团队创始人：</span>
                  {{teamsetter}}
                </div>
                 <div  class="text item settime">
                  <span class="og">创建时间：</span>
                  {{teamsettime}}
                </div>
                 <div  class="text item peoplenum">
                  <span class="og">现有人数：</span>
                  {{teamernum}}
                </div>
                
              </el-card>

              <el-card class="box-card2">
                <div  class="text item introduce">
                  <span class="og">团队简介：<i class="el-icon-edit" style="font-size:20px" @click="changeintro()" title="重命名"></i></span>
                  
                  <p style="text-indent:2em;font-weight:500">{{teamintro}}</p>
                </div>
                
              </el-card>
        </div>
     </div>
        <div class="chooseteam" v-else>
            <el-empty description="你还有没选择你的团队，快去选择一个吧" :image-size="200"></el-empty>
        </div>


</el-container>
</template>
<script>
export default {
    data(){
      return{
        teamname:JSON.parse(sessionStorage.getItem('team')).name,
        newteamname:'',
        flag1: false,
        flag2: false,
        teamtype:'IT',
        teamsetter:'Cooper',
        teamsettime:'2022.08.01',
        teamernum:'6',
        teamintro:'小学期暑假工，均曾有过叙利亚暑假工实习经验，多曾从事悍匪职业，有较高职业素养'
      }
    },
    methods:{
      changename(){
         this.$prompt('请输入新的团队名称', '修改团队名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '修改成功'
            //发包
          });
        }).catch(() => {
              
        });
      },
    }
}
</script>
<style scoped>

.main{
  width: 100%;
}
.content .el-icon-edit{
  float: right;
}
  .teamname{
    height: 150px;
    width: 100%;
    background: linear-gradient(270.6deg, #e3f6fd -8.4%, #f6faff 100%);
    font-size: 36px;
    color: black;
    text-align: left;
    line-height: 60px;
    border-radius: 10px;
  }
  .teamname h1{
    margin-left: 50px;
    margin-top: 20px;
  }
  .chooseteam{
    position: absolute;
    left: 0;
    right: 0;
  }
  .el-icon-edit:hover{
    cursor: pointer;
  }

  .content{
    margin-top: 100px;
  }
   .text {
    font-size: 20px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 550px;
    height: 350px;
    float: left;
    margin-left: 50px;
    border-radius: 15px;
    text-align: left;
    
  }
  .box-card .og{
    font-weight: bold;
  }
    .box-card2 {
    width: 550px;
    height: 350px;
    float: right;
    margin-right: 50px;
    border-radius: 15px;
    text-align: left;
    font-weight: bold;
  }
  .box-card2 .og{
    font-weight: bold;
  }
</style>