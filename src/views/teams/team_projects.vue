<template>
<el-container>
   <div class="main">
     <div class="title" >
        <h1> (ง •_•)ง <br>这里是团队的项目</h1>
    </div>

    <div class="recent">
      <h1>最近项目</h1>
    </div>

    <div class="all">
      <h1>全部项目</h1>
    </div>
  </div>
</el-container>
 
</template>

<script>
export default {
  
}
</script>

<style scoped>
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
  }
  .all{
    width: 100%;
    text-align: left;
  }
</style>