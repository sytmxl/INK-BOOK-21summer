<template>
  <el-container>
    <el-header style="height: 80px">
      <top-frame2></top-frame2>
    </el-header>
    <el-main>
      <div class="pic" v-if="!imageUrl">
        <img src="../../assets/member_270x210.jpg" alt="" />
      </div>
      <div class="pic" v-else><img :src="imageUrl" alt="" /></div>
      <div class="info">
        <el-descriptions
          class="margin-top"
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
            <div class="user_name">sss</div>
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
            <div class="real_name">王大狗</div>
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
            <div class="email">10086@qq.com</div>
            <div class="new_email" style="display: none">
              <el-input
                v-model="new_email"
                placeholder="请输入新邮箱"
                id="new_email"
              ></el-input>
            </div>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <el-divider></el-divider>
      <el-tabs
        v-model="activeName"
        tab-position="left"
        @tab-click="handleClick"
      >
        <el-tab-pane label="个人所在团队" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="正在进行项目" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="已经完成项目" name="third">角色管理</el-tab-pane>
      </el-tabs>
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
      new_user_name:"",
      new_real_name:"",
      new_email:"",
    };
  },
  components: {
    topFrame2,
  },
  methods: {
    init_intro(){
      // 发包
    },
    edit() {
      let x = document.querySelector("#edit");
      let y = document.querySelector("#save");
      let a1 = document.getElementsByClassName("user_name");
      let a2 = document.getElementsByClassName("new_user_name");
      let a3 = document.getElementsByClassName("real_name");
      let a4 = document.getElementsByClassName("new_real_name");
      let a5 = document.getElementsByClassName("email");
      let a6 = document.getElementsByClassName("new_email");
      x.style.display = "none";
      y.style.display = "block";
      a1[0].style.display = "none";
      a3[0].style.display = "none";
      a5[0].style.display = "none";
      a4[0].style.display = "block";
      a2[0].style.display = "block";
      a6[0].style.display = "block";
    },
    save() {
      let x = document.querySelector("#edit");
      let y = document.querySelector("#save");
      let a1 = document.getElementsByClassName("user_name");
      let a2 = document.getElementsByClassName("new_user_name");
      let a3 = document.getElementsByClassName("real_name");
      let a4 = document.getElementsByClassName("new_real_name");
      let a5 = document.getElementsByClassName("email");
      let a6 = document.getElementsByClassName("new_email");
      x.style.display = "block";
      y.style.display = "none";
      a2[0].style.display = "none";
      a4[0].style.display = "none";
      a6[0].style.display = "none";
      a1[0].style.display = "block";
      a3[0].style.display = "block";
      a5[0].style.display = "block";
      a1[0].innerHTML = this.new_user_name;
      a3[0].innerHTML = this.new_real_name;
      a5[0].innerHTML = this.new_email;
      // 发包
    },
  },
  mounted(){
      this.init_intro();
      // this.init_personal();
    }
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
.pic {
  margin: 0;
  padding-top: 3%;
  margin-bottom: -15px;
  height: 48%;
  width: 38%;
  /* background:pink; */
}
.pic img {
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
.info {
  float: right;
  position: relative;
  top: -40%;
  right: 10%;
  width: 800px;
}
</style>