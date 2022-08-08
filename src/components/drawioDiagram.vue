<template>
  <div>
    <el-dialog
        title="修改圖表信息"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="closeDialog">
      <el-row>
        <el-col :span="4">
          标题：
        </el-col>
        <el-col :span="20">
          <el-input
              placeholder="请输入标题"
              maxlength="20"
              show-word-limit
              v-model="newHeader">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          图注：
        </el-col>
        <el-col :span="20">
          <el-input
              placeholder="请输入图注"
              maxlength="20"
              show-word-limit
              v-model="newBrief">
          </el-input>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="updateData">確定</el-button>
      </span>
    </el-dialog>
    <el-card class="diagram effect-3" :body-style="{ padding: '0px' }" style="text-align: center;width: 360px;" shadow="always">
      <div class="preview">
        <img v-if="base64src" style="cursor: pointer;" title="编辑" @click="edit"
             :src="this.base64src" id="graph" ref="graph">
        <i v-else class="el-icon-loading" style="margin-top: 35%"/>
      </div>
      <div class="member-info">
        <h3>{{title}}</h3>
        <h5>{{description}}</h5>
        <h5>最后编辑-{{ lastEditTime }}</h5>
        <div class="social-touch" v-if="isdel != true">
          <el-button type="info" icon="el-icon-edit" circle title="编辑" @click="edit"/>
          <el-button type="danger" icon="el-icon-delete" circle title="移动到回收站" @click="del"/>
          <el-button icon="el-icon-magic-stick" circle title="修改信息" @click="openDialog"/>
        </div>
        <div class="social-touch" v-else>
          <el-button type="info" icon="el-icon-magic-stick" circle title="还原" @click="recover"/>
          <el-button type="danger" icon="el-icon-close" circle title="彻底删除" @click="foreverDel" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import drawio from "@/scripts/drawio";
import qs from "qs";
export default {
  name: "drawioDigram",
  props:{
    graph_id:{default:0},
    isdel:{default: false}
  },
  beforeMount() {
    this.getData();
  },
  methods:{
    closeDialog(){
      this.$data.dialogVisible = false
    },
    openDialog(){
      this.$data.dialogVisible = true
    },
    edit(){
      drawio.DiagramEditor.editElement(
          this.$refs.graph, this.$data.configs,
          "kennedy",
          null,
          ['pv=0'],
          this.$props.graph_id);
      this.$emit('startEdit');
      if(!localStorage.getItem('noTipsOnedit')){
        this.$notify({
          iconClass: 'el-icon-guide',
          title: '欢迎！下面有一些使用提示...',
          message: '如果您想查看或不再显示提示，请点击这里',
          position: 'bottom-right',
          duration: 0,
          onClick: this.ifNoMoreTips,
        });
      }
    },
    ifNoMoreTips(){
      this.$confirm('您是否要看看这些提示？', '', {
        confirmButtonText: '看一看',
        cancelButtonText: '不再显示',
        iconClass:'el-icon-question'
      }).then(() => {
        this.getTips();
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '在您的localstorage被清除前提示会被隐藏'
        });
      });
    },
    getTips(){
      this.$notify({
        iconClass: 'el-icon-guide',
        title: '基本的导航',
        message: '按住鼠标中键来拖动画布，使用滚轮缩放画布',
        position: 'bottom-right',
        duration: 0,
        onClose: this.ifNoMoreTips,
        onClick: this.getTips,
      });
    },
    del(){
      this.$confirm('您可以去回收站找回它们', '您正试图删除\"'+this.$data.title+'\"', {
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios({
          method: "post" ,
          url: "app/del_graph" ,
          data: qs.stringify({
            project_id:this.$data.project_id,
            graph_id:this.$props.graph_id
          }),
        }).then(res=>{this.$emit('deled');});
        this.$message({
          type: 'info',
          message: '已将\"'+this.$data.title+'\"扔到回收站'
        });

      });

    },
    recover(){
      this.$axios({
        method: "post" ,
        url: "app/recover_graph" ,
        data: qs.stringify({
          graph_id:this.$props.graph_id
        }),
      }).then(res=>{this.$emit('deled');});
      this.$message({
        type: 'info',
        message: '已恢复\"'+this.$data.title+'\"'
      });
    },
    foreverDel(){
      this.$confirm('永久删除\"'+this.$data.title+'\"?', '您正试图进行不可逆操作', {
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: "post" ,
          url: "app/full_del_graph" ,
          data: qs.stringify({
            project_id:this.$data.project_id,
            graph_id:this.$props.graph_id
          }),
        }).then(res=>{this.$emit('deled');});
        this.$message({
          type: 'info',
          message: '已删除\"'+this.$data.title+'\"'
        });
      });

    },
    getData(){
      this.$axios({
        method: "post" ,
        url: "app/get_graph" ,
        data: qs.stringify({
          graph_id:this.$props.graph_id
        }),
      }).then(res => {
        this.$data.title = this.$data.newHeader = res.data.data.header;
        this.$data.description = this.$data.newBrief = res.data.data.brief;
        this.$data.lastEditTime = res.data.data.lastedit;
        this.$data.base64src = res.data.data.data;
      })
    },
    updateData(){
      this.$axios({
        method: "post" ,
        url: "app/modify_graph" ,
        data: qs.stringify({
          graph_id:this.$props.graph_id,
          graph_name:this.$data.newHeader,
          graph_info:this.$data.newBrief
        }),
      }).then(res=>{this.$emit('deled');});
      this.$message({
        message: '\"'+this.$data.newHeader+'\"已更新了信息',
        type: 'success'
      });
      this.$data.newHeader = this.$data.newBrief = null;
      this.$data.dialogVisible = false;
    }
  },
  data() {
    return {
      dialogVisible:false,
      newHeader:null,
      newBrief:null,
      project_id:sessionStorage.getItem("project"),
      title:"项目",
      description:"无简介",
      lastEditTime:"2077-01-01",
      base64src:'',
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

.diagram{	border-radius: 4px;width: 100%; height: auto; float: left; margin: 30px 2.5%; background-color: #ffffff; text-align: center; position: relative;}
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
