<template>
  <div id="init">
    <el-dialog :modal="false"
        title="新建一个UML图"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="closeDialog">
      <span>
        <span>
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
        </span>
        <span>
          <el-row>
            <el-col :span="4">
              UML模板：
            </el-col>
            <el-col :span="4">
              <el-select v-model="template" placeholder="请选择">
                <el-option
                    v-for="item in template_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col span="16">
              <img :src="template_options[template].preview">
            </el-col>
          </el-row>
        </span>
      </span>


      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="add_graph">新建</el-button>
      </span>
    </el-dialog>
    <el-container>
      <el-aside width="200px">
        <project-aside/>
      </el-aside>
      <div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo second" collapse="true">
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
        </el-menu>
      </div>
      <div class="right">
        <h1 class="label">所有UML图</h1>
        <el-row v-if="UMLList.length != 0">
          <el-col :span="5" v-for="(id, index) in UMLList" :key="id" :offset="index > 0 ? 2 : 0">
            <drawio-digram :graph_id = "id" :isdel = "viewingDel" v-on:deled = "updateOnDel"/>
          </el-col>
        </el-row>
        <el-row v-else>
          <el-empty :image-size="200"></el-empty>
        </el-row>
      </div>
    </el-container>
  </div>
</template>
  
<script>
import drawioDigram from "@/components/drawioDiagram";
import qs from "qs";
import drawio from "@/scripts/drawio";
import ProjectAside from "../../components/ProjectAside";
export default {
  inject: ["reload"],

  components: {drawioDigram,ProjectAside},
  beforeMount() {
    this.get_list("0");
  },
  methods:{
    updateOnDel(){
      this.get_list(this.$data.viewingDel);
    },
    viewDel(){
      if(this.viewingDel == "1"){
        this.viewingDel = "0";
      }else {
        this.viewingDel = "1";
      };
      this.get_list(this.viewingDel);
    },
    closeDialog(){
      this.$data.dialogVisible = false
    },
    get_list(del){
      this.$data.UMLList = []
      this.$axios({
        method: "post" ,
        url: "app/get_graph_list" ,
        data: qs.stringify({
          project_id:this.$data.project_id,
          type:0,
          isdeleted:del
        }),
      }).then(res => {
        let graph_list = res.data.data.graph_list

        this.$data.UMLList = [];
        let i;
        for(i in graph_list){
          //console.log(graph_list[i].graph_id)
          this.$data.UMLList.push(graph_list[i].graph_id);
        }
      })
    },
    async add_graph(template) {
      let newid = null;
      if(this.$data.newHeader == null || this.$data.newHeader == '' ){
        this.$message({
          message: 'UML图的标题不得为空',
          type: 'warning'
        });
        return;
      }
      this.closeDialog();
      await this.$axios({
        method: "post" ,
        url: "app/new_graph" ,
        data: qs.stringify({
          project_id:this.$data.project_id,
          graph_type:0,
          template:0
        }),
      }).then(async res => {
        newid = res.data.data.graph_id
        await this.$axios({
          method: "post",
          url: "app/modify_graph",
          data: qs.stringify({
            graph_id: newid,
            graph_name: this.$data.newHeader,
            graph_info: this.$data.newBrief
          }),
        })
        await this.$axios({
          method: "post",
          url: "app/update_graph_data",
          data: qs.stringify({
            graph_id: newid,
            graph_data: this.$data.template_options[this.$data.template].preview
          }),
        })
        await this.updateOnDel();
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
      project_id : JSON.parse(sessionStorage.getItem("project")).project_id,
      newHeader:null,
      newBrief:null,
      dialogVisible:false,
      viewingDel:"0",
      UMLList:[],
      template: 1,
      template_options: [{
        value: 0,
        label: '空白模板',
        preview : drawio.DiagramEditor.umlDefaultProject0
      }, {
        value: 1,
        label: '模板1',
        preview : drawio.DiagramEditor.umlDefaultProject1
      }, {
        value: 2,
        label: '模板2',
        preview : drawio.DiagramEditor.umlDefaultProject2
      }, {
        value: 3,
        label: '模板3',
        preview : drawio.DiagramEditor.umlDefaultProject3
      }, {
        value: 4,
        label: '模板4',
        preview : drawio.DiagramEditor.umlDefaultProject4
      }],
    }
  }
}
</script>

<style scoped>

.el-col {
  margin: 22px;
  width: 360px;
  /* background-color: beige; */
  z-index: 0;
}
.right {
  margin-left: 80px;
  width: 100%;
}
.second {
  float: top;
  background-color: rgb(255, 255, 255) !important;
  position: fixed;
  height: 10000px;
}
.second:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;

}

.inside {
  transition: 0.4s;
}
.inside:hover {
  margin: 15px 10px 8px 10px;
  border-radius: 15px;
}
.outside {
  transition: 0.4s;
}
.outside:hover {
  margin: 15px 0px 15px 5px;
  border: 5px;
  border-radius: 90px;
  background-color: rgba(150, 169, 183, 0.422) !important;
}
.label {
  margin: 30px 0px 0px 50px;
  font-size: 50px;
  /* float: left; */
  width: 100%;
  color: rgb(114, 132, 145); 
  text-align: left;
  animation-name: enter_label;
  animation-iteration-count: 1;
  animation-duration: 0.4s;
}
.el-empty {
  margin-bottom: 600px;
}
</style>