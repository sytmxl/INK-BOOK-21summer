<template>
<el-container>
  <div class="main">
    <div class="title" >
        <h1>/(*￣▽￣*)/ <br>这里是团队的成员们</h1>
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

  <div class="clear"></div>
  
</el-container>


</template>

<script>
import infoCard from "../../components/infocard.vue";
import norminfoCard from "../../components/norminfocard.vue";
import lowerinfoCard from "../../components/lowerinfocard.vue";
export default {
   components: {
    infoCard,
    norminfoCard,
    lowerinfoCard
  },
  data(){
    return{
      teamname:'',
      member1:{
         user_id:'1',
         user_name:'1',
         real_name:'1',
         email:'1',
         identitys:'1'
      },
      member2:{
         user_id:'2',
         user_name:'2',
         real_name:'2',
         email:'2',
         identitys:'2'
      },
        member3:{
         user_id:'3',
         user_name:'3',
         real_name:'3',
         email:'3',
         identitys:'3'
      },
      team_member_list:[
        {
         user_id:'1',
         user_name:'1',
         real_name:'1',
         email:'1',
         identitys:'1'
      },
      {
         user_id:'2',
         user_name:'2',
         real_name:'2',
         email:'2',
         identitys:'2'
      },
        {
         user_id:'3',
         user_name:'3',
         real_name:'3',
         email:'3',
         identitys:'3'
      },
      ]
    }
  }
  
}
</script>

<style scoped>
.clear{
  clear: both;
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