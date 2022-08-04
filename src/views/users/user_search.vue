<template>
  <el-container>
    <el-header style="height: 80px; z-index: 2">
      <top-frame2></top-frame2>
    </el-header>
    <el-main style="overflow: scroll">
      <el-row class="info">
        <el-col :span="14">
          <span class="slo">您搜索"{{ content }}"的结果如下：</span>
        </el-col>
      </el-row>
      <el-row class="nei">
        <el-col :span="4"><img></img></el-col>
        <el-col :span="16">
          <el-tabs v-model="activeName">
            <el-tab-pane label="用户" name="first">
              <div v-if="userlist.length!=0">
              <el-card class="box-card" v-for="item in userlist">
                <div slot="header" class="clearfix">
                  <span style="float: left; margin-top:-11px;font-weight:bold;font-size:20px;">{{ item.user_name
                  }}</span>
                  <el-button style="float: right; margin-top:-19px" type="text" @click="invite(item.user_name)">发送邀请</el-button>
                  <!-- <el-button style="float: right; margin-top:-19px; padding-right: 10px;" type="text" @click="lookinfo()">查看信息</el-button> -->
                </div>
                <el-row>
                  <el-col :span="8">
                    <div class="photo">
                      <img src="../../assets/bk3.jpg"></img>
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <div class="text item name">
                      <span class="og">用户编号：</span>
                      {{ item.user_id }}
                    </div>
                    <div class="text item setter">
                      <span class="og">用户邮箱：</span>
                      {{ item.email }}
                    </div>
                    <div class="text item settime">
                      <span class="og">个性签名：</span>
                      {{ item.user_info }}
                    </div>
                  </el-col>

                </el-row>
              </el-card>
              </div>
              <div v-else style="margin-top:10%">
                <img src="../../assets/no.png" style="width:100px;height:100px;"></img>
                <div class="txt">抱歉，没有搜到符合条件的用户，请尝试一下别的条件</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="团队" name="second">
              <div v-if="teamlist.length!=0">
              <el-card class="box-card1" v-for="item in teamlist">
                  <div slot="header" class="clearfix">
                    <span style="float: left; margin-top:-11px;font-weight:bold;font-size:20px;">{{ item.team_name
                    }}</span>
                    <el-button style="float: right; margin-top:-19px" type="text">申请加入团队</el-button>
                  </div>
                  <div class="text item name">
                    <span class="og">团队编号：</span>
                    {{ item.team_id }}
                  </div>
                  <div class="text item setter">
                    <span class="og">团队类型：</span>
                    {{ item.team_type }}
                  </div>
                  <div class="text item setter">
                    <span class="og">团队人数：</span>
                    {{ item.team_member_num }}
                  </div>
                  <div class="text item setter">
                    <span class="og">队长姓名：</span>
                    {{ item.team_owner_user_name }}
                  </div>
                  <div class="text item setter">
                    <span class="og">队长邮箱：</span>
                    {{ item.team_owner_user_email }}
                  </div>
                  <div class="text item settime">
                    <span class="og">团队简介：</span>
                    {{ item.team_owner_user_info }}
                  </div>
              </el-card>
              </div>
              <div v-else style="margin-top:10%">
                <img src="../../assets/no.png" style="width:100px;height:100px;"></img>
                <div class="txt">抱歉，没有搜到符合条件的团队，请尝试一下别的条件</div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="4"><img></img></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import qs from "qs";
import topFrame2 from "../../components/topFrame2.vue";
export default {
  inject: ["reload"],
  components: {
    topFrame2,
  },
  data() {
    return {
      user_name: "",
      activeName: "first",
      content: JSON.parse(sessionStorage.getItem("searched")).content,
      userlist: [],
      teamlist: [],
    };
  },
  methods: {
    invite(user_name){
      this.$axios({
        method: "post",
        url: "/app/generate_invite_link",
        data: qs.stringify({
          team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
          invite_method: 'email',
          invite_user_name: user_name
        }),
      })
        .then((res) => {
          this.$message.success("邀请信息已发送")
        })
        .catch((err) => {
          console.log(err); 
        });
    },
    init() {
      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/app/search_user_by_username" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        // headers:{
        //   'authorization':JSON.parse(sessionStorage.getItem("token")).token_num
        // }
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          user_name: this.content,
          query_type: "fuzzy"
        }),
      })
        .then((res) => {
          console.log(res);
          if (res.data.errno == 0) {
            console.log("成功搜索用户");
            res.data.data.user_list.forEach((item) => {
              var tmp = {
                user_id: "",
                user_name: "",
                email: "",
                user_info: "",
              };
              tmp.user_id = item.user_id;
              tmp.user_name = item.user_name;
              tmp.email = item.email;
              tmp.user_info = item.user_info;
              console.log(tmp);
              this.userlist.push(tmp);
              console.log(this.userlist);
            });
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

      this.$axios({
        method: "post" /* 指明请求方式，可以是 get 或 post */,
        url: "/app/search_team_by_teamname" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
        // headers:{
        //   'authorization':JSON.parse(sessionStorage.getItem("token")).token_num
        // }
        data: qs.stringify({
          /* 需要向后端传输的数据，此处使用 qs.stringify 将 json 数据序列化以发送后端 */
          team_name: this.content,
          query_type: "fuzzy"
        }),
      })
        .then((res) => {
          console.log(res);
          if (res.data.errno == 0) {
            console.log("成功搜索团队");
            res.data.data.team_fuzzy_list.forEach((item) => {
              var tmp = {
                team_name: "",
                team_id: "",
                team_type: "",
                team_member_num: "",
                team_owner_user_name: "",
                team_owner_user_email: "",
              };
              tmp.team_id = item.team_id;
              tmp.team_name = item.team_name;
              tmp.team_type = item.team_type;
              tmp.team_member_num = item.team_member_num;
              tmp.team_owner_user_name = item.team_owner_user_name;
              tmp.team_owner_user_email = item.team_owner_user_email;
              console.log(tmp);
              this.teamlist.push(tmp);
              console.log(this.teamlist);
            });
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
    lookinfo(val) {
      // this.$router.push({path:'/home',query: {user_id:val}})     
    }
  },
  mounted() {
    console.log(this.$route.path);
    this.init();
  },
};
</script>

<style scoped>
.el-main {
  /* overflow:visible;  */
  /* padding-top: 0;  */
  position: absolute;
  left: 0;
  right: 0;
  top: 62px;
  bottom: 0;
  overflow-y: hidden;
}

.el-header {
  background-color: white;
  text-align: left;
  color: black;
  /* box-shadow: 1px 1px 10px rgb(240, 242, 245); */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.slo {
  font-weight: bold;
  font-size: 25px;
  color: #444444;
  margin-right: 40%;
}

.nei {
  margin-top: 2%;
}

.text {
  font-size: 15px;
}

.item {
  padding: 10px 0;
}

.box-card {
  width: 45%;
  height: 220px;
  float: left;
  /* margin-left: 10px; */
  margin-right: 30px;
  margin-left: 5px;
  border-radius: 15px;
  text-align: left;
  margin-bottom: 20px;
}

.box-card1 {
  width: 45%;
  height: 350px;
  float: left;
  /* margin-left: 10px; */
  margin-right: 30px;
  margin-left: 5px;
  border-radius: 15px;
  text-align: left;
  margin-bottom: 20px;
}

.box-card .og {
  margin-top: 20px;
  font-weight: bold;
}

.el-card {
  border-radius: 20px;
  border-color: #c0c4cc;
}

.el-card:hover {
  border-color: #3f77e7;
}

.settime {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.photo {
  width: 100%;
  height: 20vh;
  margin-top: -4px;
}

.photo img {
  width: 90%;
  height: 100%;
  border-radius: 50%;
}
</style>