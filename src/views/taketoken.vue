<template>
    
</template>

<style scoped>

</style>

<script>
export default {
    methods:{
        init(){
            this.$axios({
        method: "post",
        url: "join_team_by_token",
        data: qs.stringify({
          token: this.$route.params,
        }),
      })
        .then((res) => {
          if(res.data.errno==0){
            this.$message.success("加入成功");
            location.href="welcome";
          }
          else if(res.data.errno==1001){
            this.$message.warning("请登录后重试");
            location.href="welcome";
          }
          else if(res.data.errno==2006){
            this.$message.success("你已经加入团队了，无须重复加入");
            location.href="welcome";
          }
          
        })
        .catch((err) => {
          console.log(err); 
        });
        }
    },
    mounted:{

    }
}
</script>