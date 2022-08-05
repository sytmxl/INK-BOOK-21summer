<template>
  <div class="top">

    <div class="left">
        <div id="nav-header">
          <a class="brand" href="/"></a>
          <span class="brandtext1" href="/">INK BOOK&nbsp;&nbsp;</span>
          <!-- <div
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
          <span class="brandtext2" href="/">&nbsp;墨书</span> -->
        </div>
  </div>

  

    <div class="team">
               <el-dropdown trigger="click">
                 <span class="el-dropdown-link">
                   {{checkedteam}}<i class="el-icon-arrow-down el-icon--right"></i>
                 </span>
               
                 <el-dropdown-menu slot="dropdown">
                   <el-dropdown-item  v-for = "item in allteams" :key="item"   @click.native="checkit(item)" icon="el-icon-check">{{item.team_name}}</el-dropdown-item>
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
                      <el-button type="primary" @click="newteam()">确 定</el-button>
                    </div>
                  </el-dialog>

    </div>
    <div class="search">
            <el-input
              placeholder="按下回车键即可搜索"
              prefix-icon="el-icon-search"
              v-model="input" clearable="true" 
              @keyup.enter.native="doSearch()">
            </el-input>
  </div>
     <div class="right">

       <div class="user">

            
       
            <img src="../assets/bk3.jpg" alt=""/>
            <div class="username">
                <a href="user_information" title="个人中心">{{username}}</a>
                <a href="/" title="登出" @click="logout()">登出</a>
            </div>
            
            
      </div>
      
        

         
     </div>
  <div class="clear"></div>
          
       

  </div>
</template>

<script>
import qs from "qs";
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
        allteams:[],
        username:JSON.parse(sessionStorage.getItem('user')).username,
        input:"",
      }
    },
    methods:{
      logout(){
        sessionStorage.removeItem('team');
      },
      doSearch()
      {
        var info = {content: this.input};
        this.$router.push({path:'/user_search'});
        this.$store.dispatch("savesearched", info);
      },
      checkit(content){
        console.log(content)
        this.checkedteam = content.name
        this.$store.dispatch("saveteam", content);
        location.reload();
      },
      newteam(){
        this.dialogFormVisible = false;
        console.log(this.form);
         this.$axios({
        method: "post",
        // headers: { "authorization": JSON.parse(sessionStorage.getItem('token')) },
        url: "create_team",
        data: qs.stringify({
          team_name: this.form.name,
          team_type:this.form.type,
          team_info: this.form.intro
        }),
      })
        .then((res) => {
          console.log(res);
          var content = {teamId: res.data.data.team_id, team_name: this.form.name}; 
          console.log(content);
           this.$store.dispatch("saveteam", content);
           this.$message.success(res.data.msg);
           location.reload();
          // this.start = res.data.OrderDate;
          //待定
            
        })
        .catch((err) => {
          console.log(err); 
        });

      },
      init(){
         this.$axios({
        method: "get",
        url: "get_team_list",
        data: qs.stringify({
        }),
      })
        .then((res) => {
          console.log(res.data.data);
          console.log(666);
          for( var i in res.data.data.team_list_owner){
            this.allteams.push(res.data.data.team_list_owner[i]);
          }
           for( var i in res.data.data.team_list_admin){
            this.allteams.push(res.data.data.team_list_admin[i]);
          }
           for( var i in res.data.data.team_list_member){
            this.allteams.push(res.data.data.team_list_member[i]);
          }
          // this.allteams.push(res.data.data.team_list_owner);
          // this.allteams.push(res.data.data.team_list_admin);
          // this.allteams.push(res.data.data.team_list_member);
          
          console.log(this.allteams)
        })
        .catch((err) => {
          console.log(err); 
        });


        if(JSON.parse(sessionStorage.getItem('team'))==null){
          this.checkedteam = '请选择你的团队';
          console.log(this.checkedteam)
        }
        else{
          this.checkedteam = JSON.parse(sessionStorage.getItem('team')).team_name;
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
  color:rgb(73, 88, 100);
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
}
.left{
  float: left;
  position: absolute;
  left: 20px;
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
.team{
  margin-left: 250px;
  margin-top: 15px;
  float: right;
}
.user{
  margin-right:0px;
  float: right;
}

.user img{
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 50%;
}
.username{
  font-size: 0px;
  transition: 0.5s;
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
  color: rgb(150, 169, 183);
}
.user:hover .username {
  font-size: 20px;
  margin: 10px 10px 10px 10px;
  padding: 10px 0px 10px 0px;
  float: right;

  /* padding: 10px 10px 10px 80px; */
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
    border-radius: 10px;
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
  .search{
    margin-right: 150px;
    margin-top: 10px;
    float: right;
  }
  .search {
    margin-left: 50px;
    width: 5px;
    transition: 0.5s;
  }
  .search:hover {
    width: 300px;
    border-color: rgb(150, 169, 183) !important;
    box-shadow: 5px;
  }
  .search:active {
    width: 300px;
    border-color: rgb(95, 106, 113) !important;
    box-shadow: 5px;
  }
  .search:focus {
    width: 300px;
    border-color: rgb(95, 106, 113) !important;
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