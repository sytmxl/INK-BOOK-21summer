<template>
    <div class="single-member effect-3" v-if="people.identitys==3">
		            	<div class="member-image">
		                	<img src="../assets/bk3.jpg"  alt="Member">
		                	<!-- <img src="../assets/member_270x210.jpg"  alt="Member"> -->
		                </div>
		                <div class="member-info">
		                	<h3>用户名：{{people.user_name}}</h3>
		                    <h5>身份：团队创始人</h5>
                            <h5>真实姓名：{{people.real_name}}</h5>
		                    <h5>邮箱：{{people.email}}</h5>
		                    <div class="social-touch">
		                    	<el-button type="success" icon="el-icon-user" circle title="个人信息"></el-button>
		                    </div>
		                </div>
		            </div>
</template>

<style scoped>
.single-member{
    border-radius: 20px;
    width: 250px; float: left; margin: 30px 2.5%; 
    background-color: rgba(0, 48, 83, 0.506); 
    text-align: center; position: relative;color: white;}
.member-image img{max-width: 100%; vertical-align: middle;height: 100%;}
h3 {font-size: 24px; font-weight: normal; margin: 10px 0 0; text-transform: uppercase;}
h5 {font-size: 16px; font-weight: 300; margin: 0 0 15px; line-height: 22px;}
p {font-size: 14px; font-weight: 300; line-height: 22px; padding: 0 30px; margin-bottom: 10px;}
.social-touch a{display: inline-block; width: 27px; height: 26px; vertical-align: middle; margin: 0 2px;  background-repeat: no-repeat; opacity: 0.7; transition: 0.3s;}
.social-touch a:hover{opacity: 1; transition: 0.3s;}
.fb-touch{background-position: 0 0;}
.tweet-touch{background-position: -35px 0;}
.linkedin-touch{background-position: -71px 0;}
.icon-colored .fb-touch{background-position: 0 -27px;}
.icon-colored .tweet-touch{background-position: -35px -27px;}
.icon-colored .linkedin-touch{background-position: -71px -27px;}


.effect-3{max-height: 302px; min-height: 302px; overflow: hidden;}
.effect-3 h3{padding-top: 7px; line-height: 33px;}
.effect-3 .member-image{ transition: 0.4s; height: 212px; width: 100%; display: inline-block; float: none; vertical-align: middle;}
.effect-3 .member-info{transition: 0.4s;}
.effect-3 .member-image img{width: 100%; vertical-align: bottom;}
.effect-3 .social-touch{ float: left; left: 0; bottom: 0; overflow: hidden; padding: 5px 0; width: 100%; transition: 0.4s;}
.effect-3:hover .member-image{
    border-bottom: 0; 
    /* border-radius: 0 0 50px 50px;  */
    height: 81px; 
    display: inline-block; 
    overflow: hidden; 
    width: 109px; 
    /* top: -100px; */
    transition: 0.4s;
}
</style>

<script>
export default {
    // props:["name","type","email","realname","id"]
     props:{
        people:{
             type: Object,
                default: ()=>{
                    return {
                       user_id:'',
                       user_name:'',
                       real_name:'',
                       email:'',
                       identitys:''
                    }
                }
        }
    }
}
</script>