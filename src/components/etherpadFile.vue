<template>
  <el-card :body-style="{ padding: '0px'}" style="text-align: center;margin-bottom: 10px;" shadow>
    <el-card  :body-style="{ padding: '0px' }" style="width: 85%;margin: 5% auto;height: 200px;cursor: pointer;" shadow="hover" >
      <div id="incard" @click="edit"></div>
    </el-card>

    <div style="padding: 14px;">
      <span>{{$props.title}}</span>
      <div class="bottom clearfix">
        <time class="time">{{ $props.lastEditTime }}</time>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "etherpadFile",
  props:{
    title:{default: "示例项目",type: String},
    description:{default: "无简介", type:String},
    lastEditTime:{default: "2022-08-01",type:String}
  },
  methods:{
    edit(){
		
      console.log("localhost:9001/p/"+this.$options.propsData.title);
      location.href="http://localhost:9001/p/"+this.$options.propsData.title;
    }
	},
	data() {
    return {
      title:props.title,
    }
  }
}
</script>

<style scoped>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

#incard {
    background-color: rgb(238, 238, 238);
    height: 200px;
    width: 300px;
}
</style>
