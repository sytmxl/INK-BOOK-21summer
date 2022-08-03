<template>
  <el-card class="diagram effect-3" :body-style="{ padding: '0px' }" style="text-align: center;" shadow="hover">
    <div class="preview">
      <img style="cursor: pointer;" title="编辑" @click="edit"
           :src="this.base64src" id="graph" ref="graph">
    </div>
    <div class="member-info">
      <h3>{{title}}</h3>
      <h5>{{description}}</h5>
      <h5>最后编辑-{{ lastEditTime }}</h5>
      <div class="social-touch">
        <el-button type="info" icon="el-icon-edit" circle title="编辑" @click="edit"/>
        <el-button type="danger" icon="el-icon-delete" circle title="移动到回收站" />
        <el-button icon="el-icon-magic-stick" circle title="测试" @click="getData"/>
      </div>
    </div>
  </el-card>
</template>

<script>
import drawio from "@/scripts/drawio";
import qs from "qs";
export default {
  name: "drawioPrototype",
  props:{
    id:{default:0},
  },
  beforeMount() {
    this.getData();
  },
  methods:{
    edit(){
      drawio.DiagramEditor.editElement( this.$refs.graph, this.$data.configs, "kennedy", null, ['dark=1', 'pv=0']);
    },
    del(){
      this.$axios({
        method: "post" ,
        url: "/delgraph" ,
        data: qs.stringify({
          id:this.$props.id
        }),
      })
    },
    getData(){
      this.$axios({
        method: "post" ,
        url: "http://127.0.0.1:4523/m1/1379703-0-default/getgraph" ,
        data: qs.stringify({
          id:this.$props.id
        }),
      }).then(res => {
        this.$data.title = res.data.header;
        this.$data.description = res.data.brief;
        this.$data.lastEditTime = res.data.lastedit;
        //this.$data.base64src = res.data.data;
      })
    }

  },
  data() {
    return {
      title:"项目",
      description:"无简介",
      lastEditTime:"2077-01-01",
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

.diagram{border-radius: 35px;width: 100%; height: auto; float: left; margin: 30px 2.5%; background-color: #ffffff; text-align: center; position: relative;}
.preview img{max-width: 100%; vertical-align: middle;height: 100%;}
h3 {font-size: 24px; font-weight: normal; margin: 10px 0 0; text-transform: uppercase;}
h5 {font-size: 16px; font-weight: 300; margin: 0 0 15px; line-height: 22px;}
p {font-size: 14px; font-weight: 300; line-height: 22px; padding: 0 30px; margin-bottom: 10px;}
.social-touch a{display: inline-block; width: 27px; height: 26px; vertical-align: middle; margin: 0 2px;  background-repeat: no-repeat; opacity: 0.7; transition: 0.3s;}
.social-touch a:hover{opacity: 1; transition: 0.3s;}
.effect-3{max-height: 302px; min-height: 302px; overflow: hidden;}
.effect-3 h3{padding-top: 7px; line-height: 33px;}
.effect-3 .preview{ transition: 0.4s; height: 212px; width: 100%; display: inline-block; float: none; vertical-align: middle;}
.effect-3 .member-info{transition: 0.4s;}
.effect-3 .preview img{height: 100%; width: available; vertical-align: bottom;}
.effect-3 .social-touch{float: left; left: 0; bottom: 0; overflow: hidden; padding: 5px 0; width: 100%; transition: 0.4s;}
.effect-3:hover .preview{border-bottom: 0; border-radius: 0 0 50px 50px; height: 81px; display: inline-block; overflow: hidden; width: 109px; transition: 0.4s;}
</style>
