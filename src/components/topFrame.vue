<template>
  <div class="top">

    <div class="left">
         <img src="../assets/logo.png" alt="">

          <div class="team">
               <el-dropdown trigger="click">
                 <span class="el-dropdown-link">
                   {{checkedteam}}<i class="el-icon-arrow-down el-icon--right"></i>
                 </span>
               
                 <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item  v-for = "item in allteams" :key="item"   @click.native="checkit(item)">{{item}}</el-dropdown-item>

                 </el-dropdown-menu>
               </el-dropdown>
          </div>
    </div>
     <div class="right">

       <div class="user">


        
     
            <img src="../assets/bk3.jpg" alt="">
       
            
            <div class="username">
                <span>Cooper</span>
            </div>
            
          </div>
        <div class="search">
                 <el-input
              placeholder="搜索"
              prefix-icon="el-icon-search"
              v-model="input" clearable="true" >
              </el-input>
          </div>

         
     </div>
  <div class="clear"></div>
          
       

  </div>
</template>

<script>
export default {
    data(){
      return{
        input: '',
        checkedteam:'我的团队',
        allteams:['啊对对对','摆大烂队','牛逼哄哄队','123456789']
      }
    },
    methods:{
      checkit(content){
        console.log(content)
        this.checkedteam = content 
      }
    }
}
</script>

<style scoped>
.top{
  margin-top: 10px;
  display: flex;
  /* float: right; */
}
.left{
  float: left;
  position: absolute;
  left: 0;
}
.right{
  float: right;
  position: absolute;
  right:0;
}
.top img{
  width: 60px;
  height: 65px;
  margin-left: 32px;
  float: left;
}
.search{

  margin-left: 500px;
  margin-top: 10px;
  float: right;
}
.team{
   margin-left: 100px;
  margin-top: 15px;
  float: right;
  
}
.user{
  margin-right:50px;
  float: right;
}
.user img{
   width: 60px;
  height: 60px;
  border-radius: 50%;
}
.username{
  margin-left: 30px;
  margin-top: 20px;
  font-size: 20px;
  float: right;
}
.el-input >>> .el-input__inner{
    border-radius:25px;
    font-size:20px;
}
 .el-dropdown-link {
    cursor: pointer;
    color: black;
    font-size: 20px;
  }
  .el-icon-arrow-down {
    font-size: 15px;
     
  }

  .el-dropdown-menu {
      border-radius: 15px;
  }
  .el-dropdown-menu>>>.el-dropdown-menu__item{
      font-size: 20px;
      color: #409EFF
  }
  .demonstration {
    display: block;
    /* color: #409EFF; */
    font-size: 15px;
    margin-bottom: 20px;
    /* border-radius: 15px; */
  }
</style>