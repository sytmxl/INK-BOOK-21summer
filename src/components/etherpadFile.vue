<template>
  <div>
    <el-dialog
        title="新建一個共享文檔"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="closeDialog"
    >
      <span>
          <el-row>
            <el-col :span="4">
              文檔標題：
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
    <el-card :body-style="{ padding: '0px'}" style="text-align: center;margin-bottom: 10px;width: 360px;" shadow>
      <el-card  :body-style="{ padding: '0px' }" style="width: 85%;margin: 5% auto;height: 200px;cursor: pointer;" shadow="hover" >
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
        url: "app/update_doc_edit_time" ,
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
          url: "app/del_doc" ,
          data: qs.stringify({
            doc_id:this.$props.id
          }),
        });
        setTimeout(()=>{}
            ,200);
        this.$emit('deled');
        this.$message({
          type: 'info',
          message: '已将\"'+this.$data.title+'\"扔到回收站'
        });
      })
    },
    modify(){
      this.$axios({
        method: "post" ,
        url: "app/rename_doc" ,
        data: qs.stringify({
          doc_id:this.$props.id,
          doc_name:this.$data.newTitle
        }),
      })
      this.$message({
        message: '已經衝命名文檔為\"'+this.$data.newTitle+'\"',
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
          url: "app/permanent_del_doc" ,
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
        url: "app/recycle_doc" ,
        data: qs.stringify({
          doc_id:this.$props.id
        }),
      });
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

#tools {
  background-color: rgb(157, 176, 171);
  color: rgba(0, 0, 0, 0);
  transition: 0.5s;
  height: 0px;
  padding: auto;
  font-size: 0px;
}

#toolsRecycle {
  background-color: rgb(157, 162, 176);
  color: rgba(0, 0, 0, 0);
  transition: 0.5s;
  height: 0px;
  padding: auto;
  font-size: 0px;
}

.el-card:hover #tools{
  height: 40px;
  color: rgb(0, 0, 0);
  font-size: 30px;
}

el-icon-delete {
  margin: auto;
}
</style>
