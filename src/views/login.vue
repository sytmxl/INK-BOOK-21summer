<template>
  <div class="login">
    <img src="../assets/re1.png" alt="">
    <div class="logo">
      <div class="name1">
        INK BOOK
      </div>  
      <div
            id="Layer1"
            style="
              width: 2px;
              height: 50px;
              z-index: 1;
              background-color: #000000;
              layer-background-color: #000000;
              border: 2px none #000000;
              margin-top: 29px;
               margin-left: 18px;
            "
          ></div>
      <div class="name2">
        墨书
      </div>
    </div>
    <div class="kuang">
    <el-tabs v-model="activeName" @tab-click="handleClick" >
      <el-tab-pane label="邮箱登录" name="first">
        <el-form ref="form" :model="form" class="form">
        <el-form-item
          prop="email"
          :rules="[{ required: true, message: '邮箱不能为空' }]"
        >
          <el-input
            v-model="form.email"
            placeholder="请输入您的邮箱"
            type="email"
            autocomplete="off"
            clearable
            prefix-icon="el-icon-postcard"
          ></el-input>
        </el-form-item>
        <el-form-item
          id="password"
          prop="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入您的密码"
            show-password
            type="password"
            clearable
            v-model="form.password"
            autocomplete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn_login" type="primary" @click="login" round
            >登&nbsp;&nbsp;录</el-button
          >
        </el-form-item>
      </el-form>
      </el-tab-pane>
      <el-tab-pane label="用户名登录" name="second">
        <el-form ref="form" :model="form" class="form">
        <el-form-item
          prop="username"
          :rules="[{ required: true, message: '用户名不能为空' }]"
        >
          <el-input
            v-model="form.username"
            placeholder="请输入您的用户名"
            type="username"
            autocomplete="off"
            clearable
            prefix-icon="el-icon-postcard"
          ></el-input>
        </el-form-item>
        <el-form-item
          id="password"
          prop="password"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入您的密码"
            show-password
            type="password"
            clearable
            v-model="form.password"
            autocomplete="off"
            @keyup.enter.native="login"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn_login" type="primary" @click="login" round
            >登&nbsp;&nbsp;录</el-button
          >
        </el-form-item>
      </el-form>
      </el-tab-pane>
    </el-tabs>
      
      <div class="regis" @click="toRegister">没有账号？前去注册</div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "Login",
  data() {
    return {
      form: {
        email:"",
        username: "",
        password: "",
      },
      loginmethod:'',
      activeName: 'first'
    };
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
        console.log(this.activeName);
      },
    login() {
      if (this.form.username === "" && this.form.password === "") {
        this.$message.warning("请输入邮箱和密码！");
        return;
      }
      else if (this.form.username === "") {
        this.$message.warning("邮箱不能为空!");
        return;
      }
      else if(this.form.password === "") {
        this.$message.warning("密码不能为空！");
        return;
      }

      // if (
      //   !/^\w+$/.exec(this.form.username) ||
      //   !/^\w+$/.exec(this.form.password)
      // ) {
      //   this.$message.warning("请检查邮箱和密码的输入");
      //   return;
      // }
      //window.alert("用户名是："+this.username +" 密码是：" +this.password);
      if(this.activeName=='first')
      {
        this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/app/login" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          identity:this.form.email,
          loginmethod: 'email',
          password: this.form.password,
        }),
      })
        .then((res) => {
          /* res 是 response 的缩写 */
          // var usericon = {userId:  res.data.User_id,picurl:res.data.avatar_url};
          // this.$store.dispatch("saveusericon", usericon);
          switch (res.errno) {
            case 0:
              this.$message.success("登录成功！");
              var user = {userId: res.data.user_id,username: res.data.user_name};
              this.$store.dispatch("saveuser", user);
              console.log(user);
              console.log(this.$store.state.user);
              window.location.href="team_firstpage";
              /* 从 localStorage 中读取 preRoute 键对应的值 */
              // const history_pth = localStorage.getItem("FirstPage");
              /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
              break;
            case 2002:
              this.$message({
                message: res.msg,
                center: true,
                type: "error",
              });
              break;
            case 2003:
              this.$message({
                message: res.msg,
                center: true,
                type: "error",
              });
              break;
          }
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
      }
      else{
        this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/app/login" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          identity:this.form.username,
          loginmethod: 'user_name',
          password: this.form.password,
        }),
      })
        .then((res) => {
          /* res 是 response 的缩写 */
          // var usericon = {userId:  res.data.User_id,picurl:res.data.avatar_url};
          // this.$store.dispatch("saveusericon", usericon);
          switch (res.errno) {
            case 0:
              this.$message.success("登录成功！");
              var user = {userId: res.data.user_id,username: res.data.user_name};
              this.$store.dispatch("saveuser", user);
              console.log(user);
              console.log(this.$store.state.user);
              window.location.href="team_firstpage";
              /* 从 localStorage 中读取 preRoute 键对应的值 */
              // const history_pth = localStorage.getItem("FirstPage");
              /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
              setTimeout(() => {
                if (history_pth == null || history_pth === "/register") {
                  this.$router.push("/");
                } else {
                  this.$router.push({ path: history_pth });
                }
              }, 1000);
              break;
            case 2002:
              this.$message({
                message: res.msg,
                center: true,
                type: "error",
              });
              break;
            case 2003:
              this.$message({
                message: res.msg,
                center: true,
                type: "error",
              });
              break;
          }
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
      }
    },
    toRegister() {
      this.$router.push("/register");
    },
  },

};

  
</script>

<style scoped>
@font-face {
  font-family: myFont;
  src: url("../assets/Futura.ttc");
}
/* .logo{
  width: 300px;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 15%;
  
} */
.logo{
     width: 396px;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 1%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    color:black
}
/* .logo .pic{
  float: left;
  margin-top: 20px;
} */
.logo .name1{
    float: left;
    font-size: 40px;
    font-weight: 400;
    font-family: myfont;
    margin-left: -6px;
    margin-top: 30px;
}
.logo .name2{
float: right;
    font-size: 40px;
    font-weight: 400;
    font-family: "楷体";
    margin-left: 20px;
    margin-top: 30px;
}
/* .logo .pic img{
  width: 100px;
  height: 65px;
} */
.kuang {
  width: 300px;
  height: 315px;
  padding: 0 25px;
  border: 1px solid grey;
  margin: 21px auto;
  border-radius: 25px;
  line-height: 80px; /*可以让文字往下移一点 */
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 15%;
   backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
 
  box-shadow: 0 4px 6px rgb(0 0 0 / 10%), 0 12px 20px rgb(38 38 38 / 12%);
    border-radius: 12px;
}

.login {
  font-family: Avenir, Helvetica, Arial, sans-serif;
   /* background-repeat:no-repeat;
   background-size:100%;
   background-image: url("../../assets/backgroundimg/bg.png"); */
  /* height: 100%; */
   height: 100vh;
  width:100%;
  overflow: hidden;
  overflow-y: hidden;
}
.login img{
  height: 100%;
  width:100%;
}
.login >>> .el-input__inner {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.btn_login {
  width: 100%;
  margin-top: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.regis {
  float: right;
  margin-top: -34px;
  color: #999;
  cursor: pointer;
}
.regis {
  float: right;
  margin-top: -34px;
  color: #999;
  cursor: pointer;
}
.regis:hover {
  color: blue;
}
</style>