<template>
<el-container>
  <div class="main" v-if="teamname">
    <div class="title" >
        <h1>/(*￣▽￣*)/ <br>这里是团队的成员们 <i class="el-icon-plus" style="font-size:20px" @click="addmember()" title="添加新成员">添加新成员</i></h1>
    </div>
    
    <div class="boss people">
      <div class="boss_info">
           <info-card  v-for="item in team_member_list" :key="item"  :people="item"></info-card>
      </div>
    </div>
    <div class="manager people">
      <div class="manager_info">
 
            <norminfo-card  v-for="item in team_member_list" :key="item"  :people="item"></norminfo-card>

      </div>
    </div>
    <div class="worker people">
      <div class="worker_info">
   
            <lowerinfo-card  v-for="item in team_member_list" :key="item"  :people="item"></lowerinfo-card>
      
      </div>
    </div>
  </div>
 <div class="chooseteam" v-else>
            <el-empty description="你还有没选择你的团队，快去选择一个吧" :image-size="200"></el-empty>
        </div>
  <div class="clear"></div>
  
</el-container>


</template>

<script>
import infoCard from "../../components/infocard.vue";
import norminfoCard from "../../components/norminfocard.vue";
import lowerinfoCard from "../../components/lowerinfocard.vue";
import qs from 'qs';
export default {
   components: {
    infoCard,
    norminfoCard,
    lowerinfoCard
  },
  data(){
    return{
      teamname:JSON.parse(sessionStorage.getItem('team')).team_name,
      team_member_list:[]
    }
  },
  methods:{
    addmember(){
         this.$prompt('请输入用户名', '邀请新成员', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
         //存session
         //调用搜索功能，跳转到搜索页面
         this.$store.dispatch("savesearched", value);
         //此处需要发包
        }).catch(() => {
              
        });
      },

      init(){
        this.$axios({
        method: "post",
        url: "/app/get_team_member_list",
        data: qs.stringify({
          team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
        }),
      })
        .then((res) => {
          console.log(res);
          this.team_member_list = res.data.data.team_member_list    
        })
        .catch((err) => {
          console.log(err); 
        });

      }
  },
   mounted(){
      this.init()
    }
}
</script>

<style scoped>
.clear{
  clear: both;
}
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
  /* .main .people{
    margin-bottom: 200px;
    margin-left: 20px;
  } */
  .manager_info .norminfo-card{
    float:left;
  }
  .main{
    width: 100%;
  }
  .boss{
    height: auto;
    width: 100%;
  }
  .manager{
     height: auto;
    width: 100%;
  }
  .worker{
     height: auto;
    width: 100%;
  }
</style>