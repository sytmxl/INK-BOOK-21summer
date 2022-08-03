<template>
  <div id="init">
    <el-dialog
        title="新建一个UML图"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="closeDialog">
      <el-row>
        <el-col :span="4">
          UML标题：
        </el-col>
        <el-col :span="20">
          <el-input
              placeholder="请输入标题"
              v-model="newHeader">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
        UML图注：
        </el-col>
        <el-col :span="20">
          <el-input
              placeholder="请输入图注"
              v-model="newBrief">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          UML标题：
        </el-col>
        <el-col :span="20">
          <el-select v-model="template" placeholder="请选择">
            <el-option
                v-for="item in template_options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="add_graph">新建</el-button>
      </span>
    </el-dialog>
    <el-container>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" collapse="true">
        <el-menu-item class="outside" index="1" @click="dialogVisible = true">
            <i class="el-icon-plus"></i>
            <span slot="title">新建表</span>
        </el-menu-item>
        <el-menu-item class="outside" index="2">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">管理</span>
        </el-menu-item>
        <el-menu-item class="outside" index="3" @click = "viewDel">
          <i class="el-icon-delete"></i>
          <span slot="title" >回收站</span>
        </el-menu-item>
        <el-menu-item class="outside" index="4" @click="test">
        <i class="el-icon-cpu"></i>
        <span slot="title">测试</span>
      </el-menu-item>
      </el-menu>

      <el-row>
        <el-col :span="5" v-for="(id, index) in UMLList" :key="id" :offset="index > 0 ? 2 : 0">
          <drawio-u-m-l :id = "id" :isdel = "viewingDel"/>
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>
  
<script>
import DrawioUML from "@/components/drawioUML";
import qs from "qs";
export default {
  components: {DrawioUML},
  beforeMount() {
    this.get_list(false);
  },
  methods:{
    test(){
      this.get_list(false);
    },
    viewDel(){
      this.viewingDel=!this.viewingDel;
      this.get_list(this.viewingDel);
    },
    closeDialog(){
      this.$data.dialogVisible = false
    },
    get_list(del){
      this.$axios({
        method: "post" ,
        url: "http://127.0.0.1:4523/m1/1379703-0-default/app/get_graph_list" ,
        data: qs.stringify({
          type:0,
          isdeleted:del
        }),
      }).then(res => {
        console.log(res.data)
        this.$data.UMLList = res.data
      })
    },
    add_graph(template) {
      let newid = null;
      if(this.$data.newHeader == null || this.$data.newHeader == '' ){
        this.$message({
          message: 'UML图的标题不得为空',
          type: 'warning'
        });
        return;
      }
      this.closeDialog();
      this.$axios({
        method: "post" ,
        url: "http://127.0.0.1:4523/m1/1379703-0-default/app/new_graph" ,
        data: qs.stringify({
          type:0,
          template:template
        }),
      }).then(res => {
        newid = res.data
        this.$data.UMLList.push(res.data)
      })
      this.$axios({
        method: "post" ,
        url: "http://127.0.0.1:4523/m1/1379703-0-default/app/modify_graph" ,
        data: qs.stringify({
          graph_id:newid,
          graph_name:this.$data.newHeader,
          graph_info:this.$data.newBrief
        }),
      })
      this.$message({
        message: '成功新建了\"'+this.$data.newHeader+'\"',
        type: 'success'
      });
      this.$data.newHeader = this.$data.newBrief = null;
    }
  },
  data() {
    return {
      newHeader:null,
      newBrief:null,
      dialogVisible:false,
      viewingDel:false,
      UMLList:[],
      template:"1",
      template_options: [{
        value: '1',
        label: '空白模板'
      }, {
        value: '2',
        label: '模板1'
      }, {
        value: '3',
        label: '模板2'
      }, {
        value: '4',
        label: '模板3'
      }, {
        value: '5',
        label: '模板4'
      }],
    }
  }
}
</script>

<style scoped>
#init{
    margin:0px auto;
    color:blueviolet;
    font-size: large;
    font-weight: bold;
}
.el-col {
  margin: 22px;
  width: 360px;
  /* background-color: beige; */
  z-index: 0;
}
.el-menu-vertical-demo {
  float: top;
  background-color: rgb(255, 255, 255) !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;

}

.inside {
  transition: 0.5s;
}
.inside:hover {
  margin: 15px 10px 8px 10px;
  border-radius: 15px;
}
.outside {
  transition: 0.5s;
}
.outside:hover {
  margin: 15px 0px 15px 0px;
  border: 5px;
  border-radius: 90px;
}
</style>