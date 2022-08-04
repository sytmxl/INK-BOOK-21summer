<template>
<el-container>
   <div class="main" v-if="teamname">
     <div class="title" >
        <h1> (ง •_•)ง <br>这里是团队的项目<i class="el-icon-plus" style="font-size:20px" @click="addproject()" title="新建项目">新建项目</i></h1>
    </div>

    <div class="recent" v-if="project_list.length!=0">
      <h1>热门项目</h1>
        <div class="content">

        <div v-for="i in 4" :key="i">
            <el-card class="box-card" shadow="hover" v-if="project_list[i-1]&&i%2==1">
                 <h5>{{project_list[i-1].project_name}}<i class="el-icon-edit" style="font-size:20px" @click="changename()" title="重命名" ></i></h5>
                 <p>创建时间：{{project_list[i-1].create_time}}</p>
                 <p>最近修改时间：{{project_list[i-1].update_time}}</p>
                   <div class="bottom">
                    <el-button type="primary" icon="el-icon-edit"  title="查看详情">查看详情</el-button>
                    <el-button type="danger" icon="el-icon-delete"  title="删除项目">删除项目</el-button>
                  </div>
              </el-card>

              <el-card class="box-card2" shadow="hover" v-if="project_list[i-1]&&i%2==0">
                <h5>{{project_list[i-1].project_name}}<i class="el-icon-edit" style="font-size:20px" @click="changename()" title="重命名" ></i></h5>
                  <p>创建时间：{{project_list[i-1].create_time}}</p>
          <p>最近修改时间：{{project_list[i-1].update_time}}</p>
                   <div class="bottom">
                    <el-button type="primary" icon="el-icon-edit"  title="查看详情">查看详情</el-button>
                    <el-button type="danger" icon="el-icon-delete"  title="删除项目">删除项目</el-button>
                  </div>
              </el-card>

               <el-card class="box-card" shadow="hover" v-if="(!project_list[i-1])&&i%2==1">
                <h5>敬请期待（＞人＜；）</h5>
              </el-card>

               <el-card class="box-card2" shadow="hover" v-if="(!project_list[i-1])&&i%2==0">
                 <h5>敬请期待（＞人＜；）</h5>
              </el-card>
        </div>
              

              <el-card class="box-card" shadow="hover" v-if="project_list[2]">
              </el-card>

              <el-card class="box-card2" shadow="hover" v-if="project_list[3]">
              </el-card>
        </div>
    </div>
    <div class="recent" v-else>
      <h1>热门项目</h1>
       <div class="chooseteam">
            <el-empty description="你尚无项目，快去新建一个吧" :image-size="200">
              <el-button @click="addproject()">新建项目</el-button>
            </el-empty>
        </div>
    </div>

    <div class="all" v-if="project_list.length!=0">
      <h1>全部项目</h1>
      <div v-for="(item,index) in project_list" :key="item">
        <el-card class="box-card" shadow="hover" v-if="index%2==0">
          <h5>{{item.project_name}}<i class="el-icon-edit" style="font-size:20px" @click="changename()" title="重命名" ></i></h5>
          <p>创建时间：{{item.create_time}}</p>
          <p>最近修改时间：{{item.update_time}}</p>
          <div class="bottom">
          <el-button type="primary" icon="el-icon-edit"  title="查看详情">查看详情</el-button>
          <el-button type="danger" icon="el-icon-delete"  title="删除项目">删除项目</el-button>
          </div>
            
      </el-card>
      <el-card class="box-card2" shadow="hover" v-else>
      </el-card>
      </div>
    
    </div>
    <div class="all" v-else>
      <h1>全部项目</h1>
       <div class="chooseteam">
            <el-empty description="你尚无项目，快去新建一个吧" :image-size="200">
              <el-button @click="addproject()">新建项目</el-button>
            </el-empty>
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
  data(){
    return{
      teamname:JSON.parse(sessionStorage.getItem('team')).team_name,
      project_list:[]
    }
    
  },
   methods:{
      changename(){
         this.$prompt('请输入新的项目名称', '修改项目名称', {
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
      addproject(){
         this.$prompt('请输入新项目名', '新建项目', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$axios({
        method: "post",
        url: "/app/create_project",
        data: qs.stringify({
          team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
          project_name: value
        }),
      })
        .then((res) => {
         
         this.$store.dispatch("saveproject", res.data.data.project_id);
         location.href = "/project_firstpage"
        })
        .catch((err) => {
          console.log(err); 
        });
        }).catch(() => {
              
        });
      },
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
  .recent{
    width: 100%;
    text-align: left;
    font-size: 36px;
    height: 800px;
  }
  .recent h1{
    margin-top: 20px;
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