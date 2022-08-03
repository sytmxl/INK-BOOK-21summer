<template>
  <div class="top">

    <div class="left">
        <div id="nav-header">
          <a class="brand" href="/"></a>
          <span class="brandtext1" href="/">INK BOOK&nbsp;&nbsp;</span>
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
          <span class="brandtext2" href="/">&nbsp;墨书</span>
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
                  <el-dropdown-item icon="el-icon-plus" @click.native="dialogFormVisible = true">点击创建团队</el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>


               <el-dialog title="创建团队" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="团队类型" :label-width="formLabelWidth">
                    <el-select v-model="form.type" placeholder="请选择团队类型" >
                           <el-option label="IT" value="IT" ></el-option>
                           <el-option label="教育" value="教育"></el-option>
                           <el-option label="金融" value="金融"></el-option>
                         </el-select>
                  </el-form-item>
                  <el-form-item label="团队名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="20字以内"></el-input>
                  </el-form-item>
              
                  <el-form-item label="团队介绍" :label-width="formLabelWidth">
                    <el-input v-model="form.intro" autocomplete="off" placeholder="50字以内"></el-input>
                  </el-form-item>
                </el-form>
                    <div slot="footer" class="dialog-footer">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                  </el-dialog>

    </div>
     <div class="right">

       <div class="user">

            <img src="../assets/bk3.jpg" alt="">
       
            
            <div class="username">
                <a href="user_information" title="个人中心"><span>{{username}}</span></a>
                <a href="/" title="登出"><span>登出</span></a>
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
        checkedteam:'',
        dialogFormVisible:false,
        form: {
          name: '',
          type: '',
          intro:''
        },
        formLabelWidth: '120px',
        allteams:[
          {id:1,name:'啊对对对'},
          {id:2,name:'摆大烂队'},
          {id:3,name:'牛逼哄哄队'},
          {id:4,name:'123456789'},],
        username:'Cooper'
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
         this.$axios({
        method: "post",
        headers: { "authorization": "" },
        url: "http://127.0.0.1/app/create_team",
        data: qs.stringify({
          
         //待定
        }),
      })
        .then((res) => {
          
          // this.start = res.data.OrderDate;
          //待定
            
        })
        .catch((err) => {
          console.log(err); 
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
.username a{
  text-decoration:none;
  margin-right: 20px;
  color: black;
}
.username a:visited{
  color: black;
}
.username a:hover{
  color: wheat;
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
  .el-input>>>.el-input__inner{
    border-radius:25px;
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