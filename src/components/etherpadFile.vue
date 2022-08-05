<template>
  <div>
    <el-dialog
        title="重命名文档"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="closeDialog"
    >
      <span>
          <el-row>
            <el-col :span="4">
              文档标题：
            </el-col>
            <el-col :span="20">
              <el-input
                  placeholder="请输入标题"
                  v-model="newTitle">
              </el-input>
            </el-col>
          </el-row>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="modify">重命名</el-button>
      </span>
    </el-dialog>
    <el-card class="toolbar" :body-style="{ padding: '0px'}" style="text-align: center;margin-bottom: 10px;width: 360px;" shadow>
      <el-card :body-style="{ padding: '0px' }" style="width: 85%;margin: 5% auto;height: 200px;cursor: pointer;" shadow="hover" >
        <div id="tools" v-if="inRecycle == false">
          <i class="el-icon-delete" @click="del"/>
          <i><img style="width: 25%" /></i>
          <i class="el-icon-edit-outline" @click="openDialog"/>
        </div>
        <div id="tools" v-if="inRecycle == true">
          <i class="el-icon-document-delete" @click="foreverDel"/>
          <i><img style="width: 25%" /></i>
          <i class="el-icon-magic-stick" @click="recover"/>
        </div>
        <div id="incard" @click="edit">

          <div class="pattern"></div>
          <div class="pattern"></div>
          <div class="pattern"></div>
          <div class="pattern"></div>

        </div>
      </el-card>

      <div style="padding: 14px;">
        <span>{{this.$data.title}}</span>
        <div class="bottom clearfix">
          <time class="time">{{ this.$props.last_edit_time }}</time>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import qs from "qs";

export default {
  name: "etherpadFile",
  props:{
    id:{default: 0},
    inRecycle:{default:false},
    title:{default: "示例项目",type: String},
    description:{default: "无简介", type:String},
    last_edit_time:{default: "2022-08-01",type:String}
  },
  methods:{
    closeDialog(){
      this.$data.dialogVisible = false;
    },
    openDialog(){
      this.$data.dialogVisible = true;
    },
    edit(){
      location.href="http://43.138.67.29:9001/p/"+this.$options.propsData.title;
      this.$axios({
        method: "post" ,
        url: "update_doc_edit_time" ,
        data: qs.stringify({
          doc_id:this.$props.id,
          doc_name:this.$props.title
        }),
      })
    },
    del(){
      this.$confirm('您可以去回收站找回它们', '您正试图删除\"'+this.$data.title+'\"', {
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios({
          method: "post" ,
          url: "del_doc" ,
          data: qs.stringify({
            doc_id:this.$props.id
          }),
        }).then(res=>{this.$emit('deled');});
        this.$message({
          type: 'info',
          message: '已将\"'+this.$data.title+'\"扔到回收站'
        });
      })
    },
    modify(){
      this.$axios({
        method: "post" ,
        url: "rename_doc" ,
        data: qs.stringify({
          doc_id:this.$props.id,
          doc_name:this.$data.newTitle
        }),
      }).then(res=>{this.$emit('deled');});
      this.$message({
        message: '已经重命名文档为\"'+this.$data.newTitle+'\"',
        type: 'success'
      });
      this.$data.title = this.$data.newTitle;
      this.$data.newTitle = null;
      this.$data.dialogVisible = false;
    },
    foreverDel(){
      this.$confirm('永久删除\"'+this.$data.title+'\"?', '您正试图进行不可逆操作', {
        confirmButtonText: '是的',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          method: "post" ,
          url: "permanent_del_doc" ,
          data: qs.stringify({
            doc_id:this.$props.id
          }),
        });
        this.$emit('deled');
        this.$message({
          type: 'info',
          message: '已删除\"'+this.$data.title+'\"'
        });
      })
    },
    recover() {
      this.$axios({
        method: "post" ,
        url: "recycle_doc" ,
        data: qs.stringify({
          doc_id:this.$props.id
        }),
      });
      this.$emit('deled');
      this.$message({
        type: 'info',
        message: '已恢复\"'+this.$data.title+'\"'
      });
    }
  },
	data() {
    return {
      title:this.$props.title,
      dialogVisible:false,
      newTitle:'',
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

#incard {
		padding-top: 15%;
    background-color: rgb(238, 238, 238);
    height: 200px;
    width: 500px;
}

.pattern {
	border: 2px;
	border-radius: 4px;
	background-color: rgb(255, 255, 255);
	margin: 5% 0% 5% 20%;	
	width: auto;
	height: 20px;
}

#toolsRecycle {
  background-color: rgb(157, 162, 176);
  color: rgba(0, 0, 0, 0);
  transition: 0.5s;
  height: 0px;
  padding: 0px;
  font-size: 0px;
}

#tools {
  background-color: rgb(157, 162, 176);
  color: rgba(0, 0, 0, 0);
  transition: 0.5s;
  height: 0px;
  padding: 0px;
  font-size: 0px;
}

.toolbar:hover #tools{
  height: 40px;
  color: rgb(0, 0, 0);
  font-size: 30px;
}

.el-icon-delete, .el-icon-edit-outline, .el-icon-document-delete, .el-icon-magic-stick {
  color: rgb(247, 239, 239);
  border-radius: 5px;
  padding: 0px;
  transition: 0.2s;
  width: 10%;
}
.el-icon-delete:hover, .el-icon-edit-outline:hover, .el-icon-document-delete:hover, .el-icon-magic-stick:hover{
  color: rgb(247, 239, 239);
  border-radius: 10px;
  width: 40%;
}
.el-icon-delete:hover {
  background-color: rgb(199, 113, 113);
}
.el-icon-edit-outline:hover {
  background-color: rgb(113, 142, 199);
}
.el-icon-document-delete:hover {
  background-color: rgb(199, 113, 113);
}
.el-icon-magic-stick:hover {
  background-color: rgb(113, 199, 130);
}
.toolbar:hover .el-icon-delete, .el-icon-edit-outline, .el-icon-document-delete, .el-icon-magic-stick {
  /* background-color: rgb(199, 113, 113); */
  padding: 5px;
}
</style>
