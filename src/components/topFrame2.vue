<template>
  <div class="top">
    <div class="left">
      <div id="nav-header">
        <a class="brand" href="/"></a>
        <a class="brandtext1" href="/">INK BOOK&nbsp;&nbsp;</a>
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
        <a class="brandtext2" href="/">&nbsp;墨书</a> -->
      </div>
    </div>

    <div class="right">
      <div class="user">
        <a href="user_information"><img src="../assets/bk3.jpg" alt="" /></a>
        <div class="username">
          <a href="user_information">{{ user_name }}&nbsp;&nbsp;</a>
          <a href="/" @click="logout()">登出</a>
        </div>
      </div>
      <div class="search">
        <el-input
          placeholder="按下回车键即可搜索"
          prefix-icon="el-icon-search"
          v-model="input"
          clearable="true"
          @keyup.enter.native="doSearch()"
        >
        </el-input>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      input: "",
      user_name: "",
      user: JSON.parse(sessionStorage.getItem("user")),
      token: JSON.parse(sessionStorage.getItem("token")),
    };
  },
  methods: {
    doSearch() {
      var info = { content: this.input };
      if (this.$route.path == "/user_search") {
        this.reload();
      } else {
        this.$router.push({ path: "/user_search" });
      }

      this.$store.dispatch("savesearched", info);
    },
    logout() {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
    },
    init() {
      //  console.log(JSON.parse(sessionStorage.getItem("token")));
      this.$axios({
        method: "get" /* 指明请求方式，可以是 get 或 post */,
        url: "/app/get_logined_userinfo" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        // headers:{
        //   'authorization':JSON.parse(sessionStorage.getItem("token")).token_num
        // }
      })
        .then((res) => {
          console.log(res);
          /* res 是 response 的缩写 */
          // var usericon = {userId:  res.data.User_id,picurl:res.data.avatar_url};
          // this.$store.dispatch("saveusericon", usericon);
          if (res.data.errno == 0) {
            console.log("成功");
            this.user_name = res.data.data.user_name;
            // var user = {
            //   userId: res.data.data.user_id,
            //   username: res.data.data.user_name,
            // };
            // this.$store.dispatch("saveuser", user);
            // console.log(user);
            // console.log(this.$store.state.user);
            // window.location.href = "team_firstpage";
            /* 从 localStorage 中读取 preRoute 键对应的值 */
            // const history_pth = localStorage.getItem("FirstPage");
            /* 若保存的路由为空或为注册路由，则跳转首页；否则跳转前路由（setTimeout表示1000ms后执行） */
            // setTimeout(() => {
            //   if (history_pth == null || history_pth === "/register") {
            //     this.$router.push("/");
            //   } else {
            //     this.$router.push({ path: history_pth });
            //   }
            // }, 1000);
          } else {
            this.$message({
              message: res.data.msg,
              center: true,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err); /* 若出现异常则在终端输出相关信息 */
        });
    },
  },
  created() {
    this.init();
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.top {
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
  color: black;
}
.brandtext2 {
  font-family: "楷体";
  user-select: none;
  text-decoration: none;
  color: black;
}
#nav-header {
  display: flex;
  height: 100%;
  margin-left: 20px;
  align-items: center;
  font-size: 35px;
  /* width: 480px; */
}
.left {
  float: left;
  position: absolute;
  left: 0;
}
.right {
  float: right;
  position: absolute;
  right: 0;
}
.splitline {
  height: 1px;
  width: 90%;
  margin-left: 5%;
  background-color: #e0e0e0;
}
.search {
  margin-right: 238px;
  margin-top: 10px;
  float: right;
}
.team {
  margin-left: 350px;
  margin-top: 15px;
  float: right;
}
.user {
  margin-right: 50px;
  float: right;
}
.user img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.username {
  margin-left: 25px;
  margin-top: 20px;
  font-size: 20px;
  float: right;
}
.username a {
  text-decoration: none;
  color: black;
}
.username a:hover {
  color: #2878ff;
}
.el-input >>> .el-input__inner {
  border-radius: 25px;
  font-size: 20px;
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
.el-dropdown-menu >>> .el-dropdown-menu__item {
  font-size: 16px;
  color: #2878ff;
}
.el-input--suffix >>> .el-input__inner {
  padding-right: 271px;
}
.demonstration {
  display: block;
  /* color: #409EFF; */
  font-size: 15px;
  margin-bottom: 20px;
  /* border-radius: 15px; */
}
</style>
<style>
.el-message-box {
  border-radius: 15px;
}
.el-button--small {
  border-radius: 15px;
}
</style>