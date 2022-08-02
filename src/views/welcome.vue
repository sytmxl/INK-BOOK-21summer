<template>
  <div>
    <div style="overflow: hidden">
      <div id="top_bg">
        <div id="nav-header">
          <a class="brand" href="/"></a>
          <a class="brandtext1" href="/">INK BOOK&nbsp;&nbsp;</a>
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
          <a class="brandtext2" href="/">&nbsp;墨书</a>
        </div>
        <ul id="nav-section">
          <li class="func">
            <a href="#part1">助力工作</a>
          </li>
          <li class="team">
            <a href="#part2">团队协作</a>
          </li>
          <li class="draw">
            <a href="#part3">灵活绘图</a>
          </li>
        </ul>
        <ul id="nav-footer">
          <el-button type="primary" plain round size="small" @click="login()"
            >登录</el-button
          >
          <el-button type="success" plain round size="small" @click="register()"
            >注册</el-button
          >
        </ul>
      </div>
    </div>
    <div class="dis1" id="part1">
        <div class="space"></div>
        <div class="space1">
            <div class="txt1">
                <div class="txt1-1 wow fadeInLeft" data-wow-delay="0.2s">
                助力每个团队的工作
                </div>
                <div class="txt1-2 wow fadeInLeft " data-wow-delay="0.2s">
                墨书在线协作平台，旨在帮助每个人更好的完成自己的工作,为中小团队的项目协作开发提供管理服务。
                </div>          
            </div>
            <div class="video">
            <video autoplay playsinline muted class="video1"> <source src="//cloud.video.taobao.com/play/u/1458252/p/1/e/6/t/1/291939960010.mp4" type="video/mp4">您的浏览器不支持 video 标签。</video>
            </div>
        </div>
    </div>
   <div class="dis2" id="part2">
        <div class="space2"></div>
        <div class="space2-1">
            <div class="pic1 wow animate__fadeInUp" data-wow-delay="0.2s">
            <img src="../assets/student2.png" class="pic1-1">
            </div>
            <div class="txt2">
                <div class="txt2-1 wow animate__fadeInUp" data-wow-delay="0.2s">
                使团队高效率协作成为可能
                </div>
                <div class="txt2-2 wow animate__fadeInUp" data-wow-delay="0.2s">
                通过墨书在线协作平台的几大功能，从产品的诞生到完善，让团队高效率完成协作，为企业创造更大的价值
                </div>          
            </div>
        </div>
        
    </div>
   <div class="dis1" id="part3">
        <div class="space"></div>
        <div class="space1">
            <div class="txt3">
                <div class="txt3-1 wow animate__slideInUp" data-wow-delay="0.2s">
                内置多款画图工具，随时灵活绘图
                </div>
                <div class="txt3-2 wow animate__slideInUp" data-wow-delay="0.2s">
                墨书在线协作平台，提供了原型设计，UML 图绘制等多样的绘图功能，助力您实现各种绘图需求
                </div>          
            </div>
            <div class="pic2 wow animate__slideInUp" data-wow-delay="0.2s">
            <img src="../assets/uml.png" class="pic2-1">
            </div>
        </div>
    </div>
  </div>
</template>


<script>
// import $ from "jquery";
export default {
  mounted() {
    // 初始化wow
    new this.$wow.WOW().init();
  },
  methods: {
    login() {
      this.$router.push({
        path: "login",
      });
    },
    register() {
      this.$router.push({
        path: "register",
      });
    },
  },
};
// $(function () {
//   $("#top_bg2").hide();
//   $(window).scroll(function () {
//     if ($(document).scrollTop() >= 30) {
//       $("#top_bg2").addClass("fixnav").slideDown();
//     } else {
//       $("#top_bg2").hide();
//     }
//   });
// });
</script>

<style scoped>
.el-button {
  margin: 13px 8px 13px 8px;
}
.el-button--small.is-round {
  padding: 9px 33px;
}
/*设置字体*/
@font-face {
  font-family: myFont;
  src: url("../assets/Futura.ttc");
}
#nav-header {
  display: flex;
  height: 100%;
  margin-left: 90px;
  align-items: center;
  font-size: 35px;
  width: 480px;
}
#nav-section {
  display: flex;
  font-size: 20px;
  width: 650px;
  /* padding-left: 170px; */
}
#nav-section li {
  margin-left: 60px;
}
#nav-section li a {
  user-select: none;
  text-decoration: none;
  color:black;;
  /* color:rgb(166,166,166); */
}
#nav-section li a:hover{
  user-select: none;
  text-decoration: none;
  color:#00bfff;
}
.func {
  display: flex;
  align-items: center;
}
.team {
  display: flex;
  align-items: center;
}
.draw {
  display: flex;
  align-items: center;
}
#nav-footer {
  display: flex;
  margin-left: 350px;
  margin-right: 75px;
  font-size: 30px;
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

/* .fixnav {
  position: fixed;
  top: 0px;
  left: 0px;
} */
#top_bg {
  width: 100%;
  height: 72px;
  background: #ffffff;
  display: flex;
  position: fixed;
  backdrop-filter: blur(20px);
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 1;
  box-shadow: 10rpx 10rpx 10rpx rgb(0 0 0 / 18%);
}
/* #init {
  margin: 20px auto;
  color: blueviolet;
  font-size: 200px;
  font-weight: bold;
} */
.dis1{
    background-color: rgb(244,244,249);
}
.space{
    height: 90px;
}
.space1{
    display: flex;
    flex-direction: row;
}
.txt1{
    margin-left: 14%;
    height:659px;
    width:358px;
}
.txt1-1{
    height: 106px;
    font-size: 64px;
    font-family: GlowSansSC-ExtendedHeavy;
    font-weight: 900;
    line-height: 72px;
    color: #2e3a59;
    letter-spacing: 2.1px;
    margin-top: 175px;
    text-align:left;
}
.txt1-2{
    font-size: 14px;
    color: #323c55;
    text-align: justify;
    line-height: 24px;
    margin-top:60px;
    font-family: PingFang SC;
}
.video{
    height:600px;
}
.video1{
    margin-top: 130px;
    margin-left:337px;
    position: relative;
    width:450px;

}
.space2{
    height: 119px;
}
.space2-1{
    display: flex;
    flex-direction: row;
}
.txt2{
    margin-left: 13%;
    height:659px;
    width:422px;
}
.txt2-1{
    height: 106px;
    font-size: 64px;
    font-family: GlowSansSC-ExtendedHeavy;
    font-weight: 900;
    line-height: 72px;
    color: #2e3a59;
    letter-spacing: 2.1px;
    margin-top: 175px;
    text-align:left;
}
.txt2-2{
    font-size: 14px;
    color: #323c55;
    text-align: justify;
    line-height: 24px;
    margin-top:60px;
    font-family: PingFang SC;
}
.pic1{
    height:600px;
}
.pic1-1{
    margin-top: 90px;
    margin-left:113px;
    position: relative;
    width:632px;

}
.pic2{
    height:600px;
}
.pic2-1{
    margin-top: 90px;
    margin-left:169px;
    position: relative;
    width: 678px;
    height: 358px;

}
.txt3{
    margin-left: 14%;
    height:659px;
    width:379px;
}
.txt3-1{
    height: 106px;
    font-size: 64px;
    font-family: GlowSansSC-ExtendedHeavy;
    font-weight: 900;
    line-height: 72px;
    color: #2e3a59;
    letter-spacing: 2.1px;
    margin-top: 131px;
    text-align:left;
}
.txt3-2{
    font-size: 14px;
    color: #323c55;
    text-align: justify;
    line-height: 24px;
    margin-top:121px;
    font-family: PingFang SC;
}
.dis2{
  background-image: url(../assets/bg2.png);
}
.dis1{
  background-image: url(../assets/bg2.png);
}
</style>