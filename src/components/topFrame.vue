<template>
            <div class="h">
          <img src="../assets/logo.png" alt="">
          <div v-if="user==null">
              <a href="../Login" id="login">登录</a>
              <a href="../register" id="register">注册</a>
          </div>
          <div v-else>
            <div v-if="this.imageUrl==''||this.imageUrl==null">
              <a href="../user" id="icon">
              <img src="../assets/logo.png" alt="" style="border-radius:50%">
              </a>
            </div>
            <div v-else>
                <a href="../user" id="icon">
              <img :src="imageUrl" alt="" style="border-radius:50%">
              </a>
            </div>
              <a href="../user" id="login">{{user.username}}</a>
              <a href="../FirstPage" id="logout" @click="logout">登出</a>
          </div>
          </div>
</template>

<script>
export default {
    
}
</script>

<style>
    .h{
  margin-top: 10px;
  display: flex;
}
.h img{
  width: 100px;
  height: 65px;
  margin-left: 32px;
}
.h a{
  text-decoration: none;
  position: absolute;
  color: black;
  vertical-align: middle;
}
.h span{
  font: bold; 
  padding-bottom: 50px;
  align-items: center;
}
.h a:hover{
  color: wheat;
}
.h #icon{
  right: 142px;
  top: 10px;
}
.h #icon img{
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.h #login{
  right: 80px;
  top: 29px;
}
.h #register{
  right: 30px;
  top: 29px;
}
.h #logout{
  right:30px;
  top: 29px;
}
</style>