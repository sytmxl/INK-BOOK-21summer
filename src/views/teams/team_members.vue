<template>
<el-container>
  <div class="main" v-if="teamname">
    <div class="title" @click="addmember()">
      <i class="el-icon-plus" style="font-size:20px" @click="addmember()" title="添加新成员"></i>
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
      team_member_list:[],
      boss_list:[],
      manager_list:[],
      member_list:[],
    }
  },
  methods:{
    addmember(){
         this.$prompt('请输入用户名', '邀请新成员', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
         
         this.$store.dispatch("savesearched", value);
         location.href="user_search";
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
          this.team_member_list = res.data.data.team_member_list;
          console.log(this.team_member_list);
          var count1 = 0;
          var count2 = 0;
          var count3 = 0;
          for(var i =0; i < this.team_member_list.length; i++ ){
            if(this.team_member_list[i].identitys==3){
              this.boss_list[count1++] = this.team_member_list[i];
            }
            else if(this.team_member_list[i].identitys==2){
              this.manager_list[count2++] = this.team_member_list[i];
            }
            else if(this.team_member_list[i].identitys==1){
              this.member_list[count3++] = this.team_member_list[i];
            }
          }   
          console.log(this.boss_list);
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
  }
  .title:hover {
    width: 62px;
    border-radius: 50%;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 10px rgba(0, 0, 0, 0.04);
  }
  /* .main .people{
    margin-bottom: 200px;
    margin-left: 20px;
  } */
  .manager_info .norminfo-card{
    float:left;
  }
  .worker_info .lowerinfo-card{
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