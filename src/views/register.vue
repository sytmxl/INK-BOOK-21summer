<template>
  <div class="register">
    <img src="../assets/bg.svg" alt="" />
    <div class="logo">
      INK BOOK
    </div>
    <div class="kuang">
      <p>Welcome</p>
      <el-form ref="form" :model="form" class="form">
        <el-form-item
          prop="email"
          :rules="[{ required: true, message: '邮箱不能为空' }]"
        >
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
            type="email"
            autocomplete="off"
            clearable
            prefix-icon="el-icon-postcard"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="username"
          :rules="[{ required: true, message: '用户名不能为空' }]"
        >
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            type="username"
            autocomplete="off"
            clearable
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="realname"
          :rules="[{ required: true, message: '真实姓名不能为空' }]"
        >
          <el-input
            v-model="form.realname"
            placeholder="请输入真实姓名"
            type="realname"
            autocomplete="off"
            clearable
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item
          id="password1"
          prop="password1"
          :rules="[{ required: true, message: '密码不能为空' }]"
        >
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请输入密码"
            show-password
            type="password"
            clearable
            v-model="form.password1"
            autocomplete="off"
            @keyup.enter.native="register"
          ></el-input>
        </el-form-item>
        <el-form-item
          id="password2"
          prop="password2"
          :rules="[{ required: true, message: '请再次输入密码' }]"
        >
          <el-input
            prefix-icon="el-icon-lock"
            placeholder="请确认密码"
            show-password
            type="password"
            clearable
            v-model="form.password2"
            autocomplete="off"
            @keyup.enter.native="register"
          ></el-input>
        </el-form-item>
        <el-form-item
          id="code"
          prop="code"
          :rules="[{ required: true, message: '请输入验证码' }]"
        >
          <el-input
            placeholder="请输入验证码"
            type="text"
            clearable
            v-model="form.code"
            autocomplete="off"
            prefix-icon="el-icon-s-check"
            @keyup.enter.native="register"
            style="width: 60%; float: left"
          ></el-input>
          <el-button class="send" type="primary" style="float: right" @click="submit"
            >发送</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button class="btn_register" type="primary" @click="register" round
            >注&nbsp;册</el-button
          >
          <el-button class="btn_reset" @click="resetForm('form')" round
            >重&nbsp;置</el-button
          >
        </el-form-item>
        <div class="regis" @click="toRegister">已有账号？前去登录</div>
      </el-form>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import team_projectsVue from './teams/team_projects.vue';
export default {
  name: "Register",
  data() {
    return {
      form: {
        email: "",
        username: "",
        realname: "",
        password1: "",
        password2: "",
        code: "",
        validcode: "",
      },
    };
  },
  methods: {
    submit() {
      if (
        this.form.username === "" ||
        this.form.password1 === "" ||
        this.form.email === "" ||
        this.form.password2 === ""
      ) {
        this.$message.warning("请输入相关信息！");
        return;
      }
      if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.exec(
          this.form.email
        )
      ) {
        this.$message.warning("请检查邮箱格式");
        return;
      }
      if (
        !/^[\u4E00-\u9FA5A-Za-z0-9_]+$/.exec(this.form.username) ||
        !/^\w+$/.exec(this.form.password1) ||
        !/^\w+$/.exec(this.form.password2)
      ) {
        this.$message.warning("请检查相关信息的输入");
        return;
      }
      if (this.form.password1 != this.form.password2) {
        this.$message.warning("两次输入密码不一致，请检查");
      }
      if (this.validcode != null) {
        this.$message.warning("请刷新后重新发送验证码");
        return;
      }
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/app/send_code" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          email: this.form.email,
          send_type: 0,
        }),
      })
        .then((res) => {
          console.log(res.data);
          if(res.data.errno==0)
          {
             this.$message.success("验证码发送成功，请查收");
          }
          else{
            this.$message.error("此邮箱已经存在！");
          }
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
    },
    register() {
      if (
        this.form.username === "" ||
        this.form.password1 === "" ||
        this.form.email === "" ||
        this.form.password2 === ""
      ) {
        this.$message.warning("请输入相关信息！");
        return;
      }
      if (
        !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.exec(
          this.form.email
        )
      ) {
        this.$message.warning("请检查邮箱格式");
        return;
      }
      if (
        !/^\w+$/.exec(this.form.password1) ||
        !/^\w+$/.exec(this.form.password2)
      ) {
        this.$message.warning("请检查相关信息的输入");
        return;
      }
      if (this.form.password1 != this.form.password2) {
        this.$message.warning("两次输入密码不一致，请检查");
      }
      if (this.code =='') {
        this.$message.warning("请输入验证码");
        return;
      }
      // if(this.form.code!=this.validcode){
      //   this.$message.warning("验证码错误！");
      //   return;
      // }
      // console.log(this.form.email)
      // window.alert("用户名是："+this.username +" 密码是：" +this.password);
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "http://localhost:8000/app/register" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          email: this.form.email,
          user_name: this.form.username,
          pass_word: this.form.password1,
          real_name: this.form.realname,
          code: this.form.code,
        }),
      })
        .then((res) => {
          /* res 是 response 的缩写 */
          console.log(res.data);
          switch (res.data.errno) {
            case 0:
              this.$message({
                message: "注册成功，将自动为您登陆",
                center: true,
                type: "success",
                duration:900
              });
              /* 将后端返回的 user 信息使用 vuex 存储起来 */
              // var user = {
              //   userId: res.data.user_id,
              //   username: res.data.username,
              // };
              // this.$store.dispatch("saveUserInfo", user);
              // var icon = { userId: res.data.user_id, picurl: "" };
              // this.$store.dispatch("saveusericon", icon);
              setTimeout(() => {
                  this.$router.push({ path:'team_outline' });
              }, 1000);
              /* 从 localStorage 中读取 preRoute 键对应的值 */
              /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
              // setTimeout(() => {
              //   if (history_pth == null || history_pth === "/register") {
              //     this.$router.push("/");
              //   } else {
              //     this.$router.push({ path: history_pth });
              //   }
              // }, 1000);
              break;

            case 2001:
              this.$message({
                message: res.data.msg,
                center: true,
                type: "error",
              });
              break;
            case 2002:
              this.$message({
                message: res.data.msg,
                center: true,
                type: "error",
              });
              break;
            case 2004:
              this.$message({
                message: res.data.msg,
                center: true,
                type: "error",
              });
              break;
          }
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
    },
    toRegister() {
      this.$router.push({ path: "/login" });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: myFont;
  src: url("../assets/Futura.ttc");
}
.logo {
  float: left;
  font-size: 40px;
  font-weight: 400;
  font-family: myfont;
  color: black;
  position: absolute;
  top: 10%;  left: 50%;  
	transform: translate(-50%,-50%);
}
.kuang {
  width: 300px;
  height: auto;
  padding: 30px 25px 0px 25px;
  /* border: 1px solid grey; */
  margin: 21px auto;
  border-radius: 40px;
  line-height: 80px; /*可以让文字往下移一点 */

  position: absolute;
  top: 50%;  left: 50%;  
	transform: translate(-50%,-50%);

  transition: 0.5s;

  backdrop-filter: blur(2px);
  background-color: rgba(255, 255, 255, 0.5);

  box-shadow: 0 0px 0px rgb(0 0 0 / 10%), 0 12px 20px rgb(38 38 38 / 12%);
}
.kuang p {
  color: black;
  font-family: myfont;
  font-size: 30px;
}
.kuang:hover {
  width: 320px;
  height: auto;
}
.register {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* background-image: url(../assets/bg.png);
  background-repeat:no-repeat;
  background-size:100%; */
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.register img {
  height: 100%;
  width: 100%;
}
.register >>> .el-input__inner {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
/* .btn_register {
  width: 30%;
  margin-top: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
.btn_reset {
  width: 30%;
  margin-top: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
} */
.regis {
  font-size: 12px;
  float: right;
  color: #999;
  cursor: pointer;
  transition: 0.5s;
}
.regis:hover {
  color: rgb(145, 171, 203);
  font-size: 15px;
  padding: 0px 0px 10px 0px;
}
.el-button:not(.send) {
  border: none;
  border-radius: 20px !important;
  background-color:rgba(121, 167, 213, 0.73);
  font-size: 20px;
  width: 30%;
  transition: 0.5s !important;
}
.el-button:not(.send):hover {
  border-radius: 20px !important;
  background-color:rgba(121, 167, 213, 0.377);
  margin: 10px 0px 10px 0px;
  font-size: 20px;
  color: rgb(255, 255, 255);

  width: 60%;
}
.el-button:active {
  border-radius: 20px !important;
  background-color:rgb(82, 109, 137);
  color: rgb(255, 255, 255);

  font-size: 20px;
}
.send {
  height: 40px !important;
  border: 2px rgba(121, 167, 213, 0.377) solid;
  border-radius: 20px !important;
  background-color:rgba(121, 167, 213, 0); 
  color: rgba(121, 167, 213, 0.377);
  font-size: 20px;
  padding: 1px;
  width: 30%;
  transition: 0.5s !important;
}
.send:hover {
  border-radius: 20px !important;
  background-color:rgb(121, 167, 213);
  color: rgb(255, 255, 255);
  width: 33%;
}
</style>