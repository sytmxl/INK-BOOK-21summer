<template>
    <el-container>
        <div class="teamname" v-if="teamname">
          <h1>Hi!</h1>
          <h1>这里是"{{teamname}}"的团队概况</h1>
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
        teamname:JSON.parse(sessionStorage.getItem('team')).name
      }
    },
    methods:{
    }
}
</script>
<style scoped>
  .teamname{
    height: 120px;
    width: 100%;
    background: linear-gradient(270.6deg, #e3f6fd -8.4%, #f6faff 100%);
    font-size: 30px;
    color: black;
    text-align: left;
    line-height: 30px;
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
</style>