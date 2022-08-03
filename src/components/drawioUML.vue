<template>
  <el-card :body-style="{ padding: '0px' }" style="text-align: center;" shadow>
    <el-card :body-style="{ padding: '0px' }" style="width: 85%;margin: 5% auto;" shadow="hover">
      <img style="cursor: pointer;" title="编辑" @click="edit"
           :src="this.base64src">
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
import drawio from "@/scripts/drawio";
export default {
  name: "drawioUML",
  props:{
    title:{default: "项目",type: String},
    description:{default: "无简介", type:String},
    lastEditTime:{default: "2077-01-01",type:String}
  },
  mounted() {
    window.base64src = this.base64src
  },
  methods:{
    edit(e){
      console.log(e.target)
      drawio.DiagramEditor.editElement(e.target, this.$data.configs, "kennedy", null, ['dark=1', 'pv=0']);
    }
  },
  data() {
    return {
      base64src:drawio.DiagramEditor.umlDefaultProject,
      configs: {
        "defaultLibraries": "uml;er;ios;basic;",
      }
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
</style>
