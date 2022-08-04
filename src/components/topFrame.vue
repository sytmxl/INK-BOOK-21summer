<template>
  <div class="top">

    <div class="left">
        <div id="nav-header">
          <a class="brand" href="/"></a>
          <a class="brandtext1" href="/">INK BOOK&nbsp;&nbsp;</a>
          <div
            id="Layer1"
            style="
              width: 2px;
              height: 50px;
              z-index: 1;
              background-color: #000000;
              layer-background-color: #000000;
              border: 2px none #000000;
            "
          ></div>
          <a class="brandtext2" href="/">&nbsp;墨书&nbsp;</a>
        </div>
  </div>

  

    <div class="team">
               <el-dropdown trigger="click">
                 <span class="el-dropdown-link">
                   {{checkedteam}}<i class="el-icon-arrow-down el-icon--right"></i>
                 </span>
               
                 <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item  v-for = "item in allteams" :key="item"   @click.native="checkit(item)" icon="el-icon-check">{{item.name}}</el-dropdown-item>
                    <div class="splitline"></div>
                  <el-dropdown-item icon="el-icon-plus" @click.native="newteam()">点击创建团队</el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
    </div>
    <div class="search">
            <el-input
              placeholder="搜索"
              prefix-icon="el-icon-search"
              v-model="input" clearable="true" >
            </el-input>
  </div>
     <div class="right">

       <div class="user">


        
     
            <img src="../assets/bk3.jpg" alt="">
       
            
            <div class="username">
                <span>Cooper</span>
            </div>
            
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
        checkedteam:'',
        allteams:[
          {id:1,name:'啊对对对'},
          {id:2,name:'摆大烂队'},
          {id:3,name:'牛逼哄哄队'},
          {id:4,name:'123456789'},]
      }
    },
    methods:{
      checkit(content){
        console.log(content)
        this.checkedteam = content.name
        this.$store.dispatch("saveteam", content);
        location.reload();
      },
      newteam(){
         this.$prompt('请为你的团队起个名称', '创建团队', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的团队是: ' + value
            //发包
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      },
      init(){
        if(JSON.parse(sessionStorage.getItem('team'))==null){
          this.checkedteam = '请选择你的团队';
          console.log(this.checkedteam)
        }
        else{
          this.checkedteam = JSON.parse(sessionStorage.getItem('team')).name
        }
      }
    },
    mounted(){
      this.init()
    }
}
</script>

<style scoped>
.top{
  margin-top: 10px;
  display: flex;
}
@font-face {
  font-family: myFont;
  src: url("../assets/Futura.ttc");
}
.brandtext1 {
  font-family: myFont;
  user-select: none;
  text-decoration: none;
  color:black;
}
.brandtext2 {
  font-family: "楷体";
  user-select: none;
  text-decoration: none;
    color:black;
}
#nav-header {
  display: flex;
  height: 100%;
  margin-left: 20px;
  align-items: center;
  font-size: 35px;
  /* width: 480px; */
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
.splitline{
  height: 1px;
  width: 90%;
  margin-left: 5%;
  background-color: #e0e0e0;
}
.search{

  margin-right: 150px;
  margin-top: 10px;
  float: right;
}
.team{
   margin-left: 350px;
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
      font-size: 16px;
      color: #2878ff;
   
  }

  .demonstration {
    display: block;
    /* color: #409EFF; */
    font-size: 15px;
    margin-bottom: 20px;
    /* border-radius: 15px; */
  }
  .left {
    margin-top: 7px;
  }
  .left:hover {
    background: rgba(150, 169, 183, 0.164);
    border-radius: 10px;
    margin-top: 7px;
  }
  .team {
    padding: 10px;
    margin-top: 7px;
    border-radius: 20px;
    transition: 0.2s;
  }
  .team:hover {
    background: rgba(150, 169, 183, 0.23);
    border-radius: 10px;
    padding: 10px;
    margin-top: 7px;
  }
  .team:active {
    background: rgba(150, 169, 183, 0.721);
    border-radius: 5px;
    padding: 12px;
    margin-top: 7px;
    font-size: 19px;
    transition: 0.05s;
  }
  .el-dropdown-item {
    transition: 0.5s;
  }
  .el-dropdown-item:hover{
    background: rgba(150, 169, 183, 0.422) !important;
    border-radius: 10px !important;
    margin: 10px !important;
  }
  .search {
    margin-left: 50px;
    width: 5px;
    transition: 0.5s;
  }
  .search:hover {
    width: 300px;
    box-shadow: 5px;
  }
</style>
<style>
    .el-message-box{
    border-radius: 15px;
  }
  .el-button--small{
    border-radius: 15px;
  }
</style>