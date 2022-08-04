<template>
  <el-container>
    <el-header style="height: 80px">
      <top-frame2></top-frame2>
    </el-header>
    <el-main >
      <el-row style="margin-top: 2.5%;margin-bottom: 5.5%;">
        <el-col span="10" >
          <img v-if="!imageUrl" class="pic" src="../../assets/member_270x210.jpg" alt="" />
          <img v-else class="pic" :src="imageUrl" alt="" />
        </el-col>

        <el-col span="11" style="margin-top: 2.5%;">         
            <el-descriptions
                :column="4"
                size="medium"
                border
                direction="vertical"
                title="个人信息"
            >
              <template slot="extra">
                <el-button id="edit" type="primary" size="small" @click="edit()"
                >编辑</el-button
                >
                <el-button
                    id="save"
                    type="primary"
                    size="small"
                    @click="save()"
                    style="display: none"
                >保存</el-button
                >
              </template>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-user"></i>
                  用户名
                </template>
                <div class="user_name">{{username}}</div>
                <div class="new_user_name" style="display: none">
                  <el-input
                      v-model="new_user_name"
                      placeholder="请输入新用户名"
                      id="new_user_name"
                  ></el-input>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-s-custom"></i>
                  真实姓名
                </template>
                <div class="real_name">{{realname}}</div>
                <div class="new_real_name" style="display: none">
                  <el-input
                      v-model="new_real_name"
                      placeholder="请输入新真实姓名"
                      id="new_real_name"
                  ></el-input>
                </div>
              </el-descriptions-item>
              <el-descriptions-item>
                <template slot="label">
                  <i class="el-icon-message"></i>
                  联系邮箱
                </template>
                <div class="email">{{email}}</div>
                <div class="new_email" style="display: none">
                  <el-input
                      v-model="new_email"
                      placeholder="请输入新邮箱"
                      id="new_email"
                  ></el-input>
                </div>
              </el-descriptions-item>
            </el-descriptions>
          
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row style="margin: 0.5%">
        <el-tabs
            v-model="activeName"
            tab-position="left"
            @tab-click="handleClick"
        >
          <el-tab-pane label="个人所在团队" name="first">
            <el-card class="box-card">
              <div  class="text item name">
                <span class="og">团队名称：</span>
                {{teamname}}

              </div>
              <div  class="text item type">
                <span class="og">团队类型：</span>
                {{teamtype}}
              </div>
              <div  class="text item setter">
                <span class="og">团队创始人：</span>
                {{teamsetter}}
              </div>
              <div  class="text item settime">
                <span class="og">创建时间：</span>
                {{teamsettime}}
              </div>
              <div  class="text item peoplenum">
                <span class="og">现有人数：</span>
                {{teamernum}}
              </div>

            </el-card>
            <el-card class="box-card">
              <div  class="text item name">
                <span class="og">团队名称：</span>
                {{teamname}}

              </div>
              <div  class="text item type">
                <span class="og">团队类型：</span>
                {{teamtype}}
              </div>
              <div  class="text item setter">
                <span class="og">团队创始人：</span>
                {{teamsetter}}
              </div>
              <div  class="text item settime">
                <span class="og">创建时间：</span>
                {{teamsettime}}
              </div>
              <div  class="text item peoplenum">
                <span class="og">现有人数：</span>
                {{teamernum}}
              </div>

            </el-card>

            <el-card class="box-card">
              <div  class="text item name">
                <span class="og">团队名称：</span>
                {{teamname}}

              </div>
              <div  class="text item type">
                <span class="og">团队类型：</span>
                {{teamtype}}
              </div>
              <div  class="text item setter">
                <span class="og">团队创始人：</span>
                {{teamsetter}}
              </div>
              <div  class="text item settime">
                <span class="og">创建时间：</span>
                {{teamsettime}}
              </div>
              <div  class="text item peoplenum">
                <span class="og">现有人数：</span>
                {{teamernum}}
              </div>

            </el-card>
            <el-card class="box-card">
              <div  class="text item name">
                <span class="og">团队名称：</span>
                {{teamname}}

              </div>
              <div  class="text item type">
                <span class="og">团队类型：</span>
                {{teamtype}}
              </div>
              <div  class="text item setter">
                <span class="og">团队创始人：</span>
                {{teamsetter}}
              </div>
              <div  class="text item settime">
                <span class="og">创建时间：</span>
                {{teamsettime}}
              </div>
              <div  class="text item peoplenum">
                <span class="og">现有人数：</span>
                {{teamernum}}
              </div>
            </el-card> 
            <el-card class="box-card">
              <div  class="text item name">
                <span class="og">团队名称：</span>
                {{teamname}}

              </div>
              <div  class="text item type">
                <span class="og">团队类型：</span>
                {{teamtype}}
              </div>
              <div  class="text item setter">
                <span class="og">团队创始人：</span>
                {{teamsetter}}
              </div>
              <div  class="text item settime">
                <span class="og">创建时间：</span>
                {{teamsettime}}
              </div>
              <div  class="text item peoplenum">
                <span class="og">现有人数：</span>
                {{teamernum}}
              </div>
            </el-card>        
            </el-tab-pane>
          <el-tab-pane label="正在进行项目" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="已经完成项目" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import qs from "qs";
import topFrame2 from "../../components/topFrame2.vue";
export default {
  inject: ["reload"],
  data() {
    return {
      imageUrl: "",
      activeName: "first",
      username: "",
      realname: "",
      email: "",
      new_username: "",
      new_real_name: "",
      new_email: "",
    };
  },
  components: {
    topFrame2,
  },
  methods: {
    edit() {
      let x = document.querySelector("#edit");
      let y = document.querySelector("#save");
      let a1 = document.getElementsByClassName("username") ;
      let a2 = document.getElementsByClassName("real_name") ;
      let a3 = document.getElementsByClassName("email") ;
      let b1 = document.getElementsByClassName("new_username") ;
      let b2 = document.getElementsByClassName("new_real_name") ;
      let b3 = document.getElementsByClassName("new_email") ;
      x.style.display = "none";
      y.style.display = "block";
      a1[0].style.display = "none";
      a2[0].style.display = "none";
      a3[0].style.display = "none";
      b1[0].style.display = "block";
      b2[0].style.display = "block";
      b3[0].style.display = "block";
    },
    save() {
      let x = document.querySelector("#edit");
      let y = document.querySelector("#save");
      let a1 = document.getElementsByClassName("username") ;
      let a2 = document.getElementsByClassName("real_name") ;
      let a3 = document.getElementsByClassName("email") ;
      let b1 = document.getElementsByClassName("new_username") ;
      let b2 = document.getElementsByClassName("new_real_name") ;
      let b3 = document.getElementsByClassName("new_email") ;
      x.style.display = "block";
      y.style.display = "none";
      a1[0].innerHTML=this.new_username;
      a2[0].innerHTML=this.new_real_name;
      a3[0].innerHTML=this.new_email
      a1[0].style.display = "block";
      a2[0].style.display = "block";
      a3[0].style.display = "block";
      b1[0].style.display = "none";
      b2[0].style.display = "none";
      b3[0].style.display = "none";
    },
    init()
    {
       console.log(JSON.parse(sessionStorage.getItem("token")));
       this.$axios({
          method: "get" /* 指明请求方式，可以是 get 或 post */,
          url: "http://localhost:8000/app/get_logined_userinfo" /* 指明后端 api 路径，由于在 main.js 已指定根路径，因此在此处只需写相对路由 */,
          headers:{
            'authorization':JSON.parse(sessionStorage.getItem("token")).token_num
          }
        })
          .then((res) => {
            console.log(res)
            if(res.data.errno==0)
            {
                console.log("成功")
                this.username=res.data.data.user_name;
                this.realname=res.data.data.real_name;
                this.email=res.data.data.email;
            }
            else{
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
    }
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.el-tabs--left,
.el-tabs--right {
  overflow: hidden;
  margin-left: 20%;
}
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

.pic{
  height: 200px;
  width: 200px;
  border-radius: 50%;

}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 70%;
  margin: -58px 11px;
  padding-left: 27%;
  overflow: hidden;
}
.el-tabs--left >>> .el-tabs__item.is-left {
  text-align: right;
  height: 80px;
  line-height: 80px;
}
.el-tabs--left[data-v-50bb520e],
.el-tabs--right[data-v-50bb520e] {
  overflow: hidden;
  margin-left: 5%;
  margin-top: 7%;
}
.el-tabs__item {
  padding: 0 20px;
  height: 75px;
  box-sizing: border-box;
  line-height: 68px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  position: relative;
}
 .text {
    font-size: 20px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 550px;
    height: 350px;
    float: left;
    margin-left: 50px;
    border-radius: 15px;
    text-align: left;
    
  }
  .box-card .og{
    margin-top: 20px;
    font-weight: bold;
  }
</style>