<template>
  <div class="bar">
    <div class="left">
      <img src="../assets/bk3.jpg" alt=""/>
      <p class="name">{{user_name}}</p>
    </div>

    <div class="right">
      <div v-if="identity == 3" id="tools">
        <i class="el-icon-user"></i>
      </div>
      <div v-else-if="identity == 2" id="tools">
        <i class="el-icon-user" ></i>
        <i class="el-icon-minus" @click="cancelmanager()"></i>
        <i class="el-icon-delete" @click="deletemember()"></i>
      </div>
      <div v-else id="tools">
        <i class="el-icon-user" ></i>
        <i class="el-icon-plus" @click="tobemanager()"></i>
        <i class="el-icon-delete" @click="deletemember()"></i>
      </div>
      <p class="id" v-if="identity == 3">团队创始人</p>
      <p class="id" v-else-if="identity == 2">管理员</p>
      <p class="id" v-else>成员</p>
      <p class="realname">真实姓名：{{realname}}</p>
      <p class="email">邮箱：{{email}}</p>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
export default {
name: "teammate",
props:{
  user_name:{default:"",type:String},
  identity:{default:0},
  email:{default:"",type:String},
  realname:{default:"",type:String},
  user_id:'',
},
methods:{
          cancelmanager(){

           this.$confirm('是否要取消该用户管理员身份, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
           this.$axios({
        method: "post",
        url: "app/change_team_member_identitys",
        data: qs.stringify({
          team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
          user_id_to_change: this.user_id,
          identitys: "member",
        }),
      })
        .then((res) => {
          if(res.data.errno==0){
            this.$message.success(res.data.msg);
            location.reload();
          }
          else{
            this.$message.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err); 
        });


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });


           
        },
        tobemanager(){
        this.$confirm('是否将其设为管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
       console.log(this.user_id)
        this.$axios({
        method: "post",
        url: "app/change_team_member_identitys",
        data: qs.stringify({
          team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
          user_id_to_change: this.user_id,
          identitys: "admin",
        }),
      })
        .then((res) => {
          if(res.data.errno==0){
            this.$message.success(res.data.msg);
          location.reload();
          }
          else{
            this.$message.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err); 
        });
       
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消设置管理员'
          });          
        });

            
        },


        deletemember(){
            
           this.$confirm('是否要从团队删除此用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          
          this.$axios({
        method: "post",
        url: "app/del_team_member",
        data: qs.stringify({
           team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
          user_id_to_del: this.user_id,
        }),
      })
        .then((res) => {
            if(res.data.errno==0){
            this.$message.success(res.data.msg);
          location.reload();
          }
          else{
            this.$message.warning(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err); 
        });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

             
        }
    }
}
</script>

<style scoped>

.bar {
  /* height: max-content; */
  /* width: 100%; */
  right: 0;
  
  /* background: rgb(255, 255, 255); */
  border:  1px solid rgba(206, 218, 226, 0.536);
  border-radius: 15px;
  
  margin: 20px;
  padding: 10px;
  /* 居中 */
  align-items: center;
  display: flex;
  transition: 0.5s;
}
.bar:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 10px rgba(0, 0, 0, 0.04);
}
.left {
  /* height: max-content; */
  /* float: left; */
  align-items: center;
  display: flex;
}
.right {
  height: 40px;
  /* float: right; */
  align-items: center;
  /* display: flex; */
  position: absolute;
  right: 5%;
  overflow: hidden;
}
img { 
  width: 50px;
  height: 50px;
  margin: 10px;
  border-radius: 50%;
}
p {
  display: inline;
  margin: 10px;
  vertical-align: center;
}
.name, .id, .realname, .email{
  display: inline-block;
  white-space: nowrap; 
  /* width: 80px;  */
  overflow: hidden;
  text-overflow:ellipsis;
}
.name {
  width: 80px;
}
.id {
  width: 120px;
}
.realname {
  width: 200px;
}
.email {
  width: 300px;
}

#tools {
  background-color: rgb(157, 162, 176);
  color: rgba(0, 0, 0, 0);
  transition: 0.5s;
  height: 0px;
  padding: 0px;
  font-size: 0px;
  border-radius: 5px;
  text-align: center;
}
.bar:hover #tools{
  height: 40px;
  color: rgb(0, 0, 0);
  font-size: 30px;
  margin-bottom: 20px;
}
.el-icon-delete, .el-icon-user, .el-icon-minus, .el-icon-plus {
  color: rgb(247, 239, 239);
  border-radius: 5px;
  padding: 0px;
  transition: 0.2s;
  width: 30%;
}
.el-icon-delete:hover, .el-icon-user:hover, .el-icon-minus:hover, .el-icon-plus:hover{
  color: rgb(247, 239, 239);
  border-radius: 10px;
  width: 33%;
}
.el-icon-delete:hover {
  background-color: rgb(36, 32, 32);
}
.el-icon-user:hover {
  background-color: rgb(113, 142, 199);
}
.el-icon-minus:hover {
  background-color: rgb(199, 113, 113);
}
.el-icon-plus:hover {
  background-color: rgb(113, 199, 130);
}
.bar:hover .el-icon-delete, .el-icon-user, .el-icon-minus, .el-icon-plus {
  /* background-color: rgb(199, 113, 113); */
  padding: 5px;
}
</style>

