<template>
  <div id="init">
    <el-dialog v-if="dialogVisible" :modal = "false"
        :visible.sync="dialogVisible"
        width="30%"
        >
      <span>{{'您是否要删除\''+ right_focused_node_label +'\'?您稍后可以去文档中心的回收站找回它们'}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="del_node">是的</el-button>
      </span>
    </el-dialog>
    <el-dialog v-if="inputVisible" :modal= "false"
        :visible.sync="inputVisible"
        width="30%"
    >
      <span slot="footer" class="dialog-footer">
        <el-input v-model="input" placeholder="请输入名称"/>
        <el-button @click="closeInputDialog">取消</el-button>
        <el-button type="primary" @click="handle_input">确认</el-button>
      </span>
    </el-dialog>
    <el-container >
      <div  class="top">
        <aside>
          <div class="resize"></div>
          <section class="aside-section">

              <div class="title" @click="exit_edit">
                <div class="back">
                  &lt;&nbsp;
                </div>
                退出编辑
              </div>
              <el-tree
                  ref="dir"
                  :data="node_data_list"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false">
                <div style="width: 100%; text-align: left"
                     class="custom-tree-node" slot-scope="{ node, data }"
                     @contextmenu.prevent="show($event,data,node)"
                     @click="onNodeClicked(data)"
                >
                  <div style="width: 100%;text-align: left"
                       @contextmenu.prevent="show($event,data,node)"
                  >
                    <i :class="data.node_icon"/>
                    <span>{{ node.label }}</span>
                  </div>
                </div>
              </el-tree>
          </section>
        </aside>
        <main v-if="in_editing == true">
          <iframe :src="docUrl" width=100% height=100%></iframe>
        </main>
        <main v-else>
          <div class="right" :id="forceUpdatePreview">
            <h1 class="label" v-if="inRecycle == false">{{this.$data.cur_node_data.label}}</h1>
            <h1 class="label" v-else>回收站</h1>
            <el-row v-if="inRecycle == false && doc_list.length != 0">
              <el-col :id="forceUpdatePreview" :span="7" v-for="item in doc_list">
                <EtherpadFile :in-recycle="false"
                              v-on:start_edit="enter_edit"
                              :id="item.doc_id" :title="item.doc_name" :last_edit_time="item.update_time"
                              :token="item.doc_token">
                  <p>{{ item.doc_name }}</p>
                </EtherpadFile>
              </el-col>
            </el-row>
            <el-row :id="forceUpdatePreview" v-else-if="inRecycle == true && recycle_list != 0">
              <el-col :span="7" v-for="item in recycle_list">
                <EtherpadFile :in-recycle="true"
                              :id="item.doc_id" :title="item.doc_name" :last_edit_time="item.update_time"
                              :token="item.doc_token"/>
              </el-col>
            </el-row>
            <el-row v-else>
              <el-empty :image-size="200"></el-empty>
            </el-row>
          </div>
        </main>
      </div>

    </el-container>
  </div>

</template>
<script>
import Vue from 'vue';
import Contextmenu from "vue-contextmenujs";
import qs from "qs";
import {apikey} from "@/scripts/apikey";
import EtherpadFile from "@/components/etherpadFile";
import ProjectAside from "@/components/ProjectAside";
import EditAside from "@/components/EditAside";

Vue.use(Contextmenu);
export default {
  components: {EtherpadFile, ProjectAside, EditAside},
  name: "project_docedit",
  /**
   * TEAM_ROOT = 0
   * FOLDER = 1
   * DOCUMENT = 2
   * PROJECT = 3
   *
   * 0-exist
   * 1-recover
   * 2-die
   *
   * {
   *  file_id:3,
   *  parent_id:2,
   *  folder_name:NULL,
   *  folder_status:NULL,
   *  file_type:3,
   *  content_i:31,
   *  team_id:36,
   *  detail:{}
   *  children:[{rec}]
   * }
   */
  async mounted() {
    await this.$axios({
      method: "post",
      url: "/app/get_project_fileid",
      data: qs.stringify({
        project_id: JSON.parse(sessionStorage.getItem('project')).project_id,
      }),
    }).then(res => {
      if(res.data.errno != 0){
        this.$message({
          message: res.data.msg,
          type: 'warning'
        });
      }
      this.$data.root_folder = res.data.data.file_id;
      this.$data.node_data_list[0].id = this.$data.root_folder
    })
    await this.$axios({
      method: "post",
      url: "/app/get_file_content",
      data: qs.stringify({
        file_id: this.$data.root_folder,
      }),
    }).then(res => {
      let i;
      for (i in res.data.data) {
        let retData = res.data.data[i];
        let node_name;
        let node_icon;
        this.$data.doc_list = [];
        // 是项目根文件夹
        if (retData.file_type === 3) {
          node_name = retData.detail.project_name;
          node_icon = 'el-icon-data-analysis'
        } else if (retData.file_type === 2) {
          this.$data.doc_list.push(retData.detail);
          node_name = retData.detail.doc_name;
          node_icon = 'el-icon-document'
        } else {
          node_name = retData.folder_name;
          node_icon = 'el-icon-folder'
        }
        this.$data.node_data_list[0].children.push({
          id: retData.file_id,
          file_type:retData.file_type,
          label: node_name,
          node_icon: node_icon,
          new_node: 0,
          children: [],
          folder_name:retData.folder_name,
          detail:retData.detail
        });
      }
    })
    this.$data.cur_node_data = this.$data.node_data_list[0];
  },
  methods: {
    exit_edit(){
      this.$data.in_editing = false;
    },
    enter_edit(token) {
      this.$data.docUrl = 'http://43.138.67.29:9001/p/' + token;
      this.$data.in_editing = true;
    },
    async update_node_data(node_data){
      node_data.children = [];
      await this.$axios({
        method: "post",
        url: "/app/get_file_content",
        data: qs.stringify({
          file_id: node_data.id,
        }),
      }).then(res => {
        let i;
        this.$data.doc_list = [];
        for (i in res.data.data) {
          let retData = res.data.data[i];
          let node_name;
          let node_icon;
          if (retData.file_type == 2) {
            this.$data.doc_list.push(retData.detail);
            node_name = retData.detail.doc_name;
            node_icon = 'el-icon-document'
          } else {
            node_name = retData.folder_name;
            node_icon = 'el-icon-folder'
          }
          node_data.children.push({
            id: retData.file_id,
            file_type:retData.file_type,
            label: node_name,
            node_icon: node_icon,
            new_node: 0,
            children: [],
            folder_name:retData.folder_name,
            detail:retData.detail
          });
        }
      })
    },
    async onNodeClicked(node_data) {
      this.$data.cur_node_data = node_data;
      if(node_data.file_type == 2){
        this.enter_edit(node_data.detail.doc_token);
      } else {
        await this.update_node_data(node_data);
      }
      this.forceUpdatePreview += 1;
    },
    async handle_input() {
      switch (this.$data.input_case){
        case 1:
          await this.create_new_node();
          break;
        case 2:
          await this.create_new_doc();
          break;
        case 3:
          await this.rename_node();
          break;
      }
      this.closeInputDialog();
      this.$data.input = '';
    },
    async create_new_node() {
      await this.$axios({
        method: "post",
        url: "/app/create_folder",
        data: qs.stringify({
          folder_id: this.$data.right_focused_node.id,
          new_folder_name: this.$data.input
        }),
      }).then(res => {
        if (res.data.errno == 0) {
          this.$message({
            message: '新建\'' + this.$data.input + '\'成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      });
      await this.update_node_data(this.$data.right_focused_node);
    },
    async create_new_doc(){
      await this.$axios({
        method: "post",
        url: "/app/create_doc",
        data: qs.stringify({
          create_method : 'folder_id',
          folder_id: this.$data.right_focused_node.id,
          doc_name: this.$data.input
        }),
      }).then(res => {
        if (res.data.errno == 0) {
          this.$message({
            message: '新建\'' + this.$data.input + '\'成功',
            type: 'success'
          });
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          });
        }
      });
      await this.update_node_data(this.$data.right_focused_node);
    },
    async rename_node() {
      if(this.$data.right_focused_node.file_type == 2){
        await this.$axios({
          method: "post",
          url: "/app/rename_doc",
          data: qs.stringify({
            file_id: this.$data.right_focused_node.id,
            doc_name: this.$data.input,
          }),
        }).then(res=>{
          if (res.data.errno == 0) {
            this.$data.right_focused_node.label = this.$data.right_focused_node.folder_name = this.$data.input;
            this.$message({
              message: '已重命名\'' + this.$data.input + '\'',
              type: 'success'
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        });
      } else {
        await this.$axios({
          method: "post",
          url: "/app/rename_folder",
          data: qs.stringify({
            file_id: this.$data.right_focused_node.id,
            folder_name: this.$data.input,
          }),
        }).then(res=>{
          if (res.data.errno == 0) {
            this.$data.right_focused_node.label = this.$data.right_focused_node.folder_name = this.$data.input;
            this.$message({
              message: '已重命名\'' + this.$data.input + '\'',
              type: 'success'
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
        });
      }
    },
    async copy_node(){
      this.$data.clipboard = this.$data.right_focused_node
      if(this.$data.right_focused_node.file_type == 2){
        this.$data.clipboard_name = this.$data.right_focused_node.detail.doc_name;
      } else {
        this.$data.clipboard_name = this.$data.right_focused_node.folder_name;
      }
    },
    async paste_node(){
      if(this.$data.right_focused_node.file_type != 1){
        this.$message({
          message: "您必须在文件夹下粘贴内容",
          type: 'error'
        });
        return;
      }
      if(this.$data.clipboard.file_type == 2){
        this.$axios({
          method: "post",
          url: "/app/copy_doc",
          data: qs.stringify({
            folder_id: this.$data.right_focused_node.id,
            doc_id: this.$data.clipboard.detail.doc_id,
          }),
        }).then(res=>{
          let resData = res.data.data;
          this.axios({
            method: "post",
            url: "api/1.2.15/copyPadWithoutHistory",
            params: {
              apikey: apikey,
              sourceID: resData.doc_token ,
              destinationID :resData.new_doc_token,
              text: 'test'
            }
          }).then(res=>{
            if(res.code == 0){this.$message({
              message: "复制\'"+this.clipboard_name+'\'到\''+this.$data.right_focused_node.folder_name+'\'成功',
              type: 'error'
            });}
          });
        })
      } else {
        this.$axios({
            method: "post",
          url: "/app/copy_folderfile",
          data: qs.stringify({
            target_dirid: this.$data.right_focused_node.id,
            folder_id: this.$data.clipboard.id,
          }),
        }).then(res=>{
          let resData = res.data.data;
          let i;
          for(i in resData){
            this.axios({
              method: "post",
              url: "api/1.2.15/copyPadWithoutHistory",
              params: {
                apikey: apikey,
                sourceID: resData[i].doc_token ,
                destinationID :resData[i].new_doc_token,
                text: 'test'
              }
            })
          }
        });
      }
      await this.update_node_data(this.$data.right_focused_node);
    },
    async del_node() {
      if(this.$data.right_focused_node.file_type == 2){
        this.$axios({
          method: "post",
          url: "/app/del_doc",
          data: qs.stringify({
            file_id: this.$data.right_focused_node.id
          }),
        }).then(res=>{
          if (res.data.errno == 0) {
            this.$message({
              message: '已将\'' + this.$data.right_focused_node.label + '\'放入回收站',
              type: 'success'
            });
            let node = this.$refs.dir.getNode(this.$data.right_focused_node);
            let data = this.$data.right_focused_node;
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            children.splice(index, 1);
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
          this.$data.dialogVisible = false;
        })
      } else {
        this.$axios({
          method: "post",
          url: "/app/del_folder",
          data: qs.stringify({
            folder_id: this.$data.right_focused_node.id
          }),
        }).then(res=>{
          if (res.data.errno == 0) {
            this.$message({
              message: '已将\'' + this.$data.right_focused_node.label + '\'放入回收站',
              type: 'success'
            });
          } else {
            this.$message({
              message: res.data.msg,
              type: 'error'
            });
          }
          this.$data.dialogVisible = false;
          let node = this.$refs.dir.getNode(this.$data.right_focused_node);
          let data = this.$data.right_focused_node;
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
        })
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    set_input_type(type){
      this.$data.input_case = type;
      this.openInputDialog();
    },
    show(event, data, node) {
      this.$data.right_focused_node = data;
      this.$data.right_focused_node_label = data.label;
      this.$contextmenu({
        items: [
          {
            label: "新建",
            divided: true,
            minWidth: 0,
            children: [
                {label: "新建文件夹", onClick: ()=>{this.set_input_type(1)}},
                {label: "新建文档", onClick: ()=>{this.set_input_type(2)}}
            ]
          },
          {
            label: "复制",
            onClick: () =>this.copy_node()
          },
          {
            label: "粘贴" + "("+this.$data.clipboard_name+")",
            onClick: () =>this.paste_node()
          },
          {
            label: "重命名",
            onClick: ()=>{this.set_input_type(3)}
          },
          {
            label: "删除",
            minWidth: 0,
            onClick: () => this.openDialog()
          },
        ],
        event, // 鼠标事件信息
        customClass: "custom-class", // 自定义菜单 class
        zIndex: 3, // 菜单样式 z-index
        minWidth: 230 // 主菜单最小宽度
      });
      return false;
    },
    newPad() {
      this.axios({
        method: "post",
        url: "api/1.2.1/createPad",
        params: {
          apikey: apikey,
          padID: this.$data.input,
          text: 'test'
        }
      });
      this.axios({
        method: "post",
        url: "api/1/setText",
        params: {
          apikey: apikey,
          padID: this.$data.input,
          text: 'test'
        }
      });
    },
    openDialog() {
      this.$data.dialogVisible = true
    },
    closeDialog() {
      this.$data.dialogVisible = false
    },
    openInputDialog() {
      this.$data.inputVisible = true
    },
    closeInputDialog() {
      this.$data.inputVisible = false
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    return {
      input_case:0,
      right_focused_node_label:'',
      clipboard:null,
      clipboard_name:'',
      inputVisible: false,
      dialogVisible: false,
      inRecycle: false,
      isCollapse: false,
      doc_list: [],
      recycle_list: [],
      project_id: JSON.parse(sessionStorage.getItem("project")).project_id,
      newDocName: '',
      in_editing: false,
      content: 'n/a',
      input: '',
      docUrl: '',
      cur_node_data: null,
      right_focused_node:null,
      filterText: '',
      node_data_list:[{
        file_type:1,
        id: null,
        label:JSON.parse(sessionStorage.getItem("project")).project_name,
        detail:[],
        folder_name:'',
        node_icon:'el-icon-data-analysis',
        new_node:false,
        children:[]
      }],
      root_folder: null,
      forceUpdatePreview:0,
    }
  },
}
</script>

<style scoped>
#init {
  min-height: calc(100vh);
}
.foldertitle {
  width: 100%;
  text-align: left;
}

.filefolder {
  height: 100%;
  position: fixed;
  overflow-x :hidden;
  overflow-y: scroll;
  text-overflow:ellipsis;
  /* width: 100%; */
  width: 200px;
  border-radius: 10px;
  border: black solid 1px;
  /* border-top: 3px solid grey; */
  /* border-bottom: 3px solid grey; */
}

.el-input {
  width: 180px;
  position: absolute;
  left: 10px;
  top: 10px;
}

.el-input >>> .el-input__inner {
  border-radius: 25px;
  font-size: 15px;
}

.el-tree {
  position: absolute;
  right:0px;
  left: 0px;
  top: 40px;
  /* background-color: rgb(240, 242, 245); */
  overflow: hidden;
  margin: 20px 20px 20px 0px;
  font-size: 16px !important;
  color: black;

  border-radius:  0px 10px 10px 0px;
  /* border: black solid 1px; */
}
/deep/ .el-tree-node {
  /* margin: 3px; */
  padding: 5px 0px 5px 0px;
}

.el-container {
  /* display: flex; */
  /* height: 100%; */
  flex-direction: column;
}

.top {
  display: flex;
  flex: 1;
  min-height: calc(100vh);
  /* 这里加上解决导航栏高度无法完全显示问题 */
}

aside {
  position: relative;
  align-self: stretch;
  overflow: hidden;
}

main {
  flex: 1;
  align-self: stretch;
  background-color: #ffffff;
}

.aside-section {
  left: 200px;
  min-height: calc(100vh);
  position: absolute;
  /* position: fixed; */
  /* left: 0; */
  /* width: 200px; */
  /* width: 100%; */
  /* transform: translateX(200px); */
  
  inset: 0px 5px 0 0;
  /* backdrop-filter: blur(25px) brightness(110%); */
  background-color: rgba(242, 243, 245, 0.493);

  border-radius: 0px 25px 25px 0px;
  /* border: black solid 1px; */

  animation-name: enter_aside;
  animation-iteration-count: 1;
  animation-duration: 0.4s;
}

.resize {
  width: 220px;
  height: 16px;
  transform: scaleY(100);
  overflow: hidden;
  resize: horizontal;
  opacity: 0;
  max-width: 800px;
  min-width: 200px;
  transition: 0.05s;
  /* min-height: calc(100vh); */
  animation: none;
}

.resize-left {
  transform: scale(-1, 100);
}


.line {
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  bottom: 0;
  background-color: royalblue;
  opacity: 0;
  transition: .3s;
  pointer-events: none;
}

.resize:hover + .line,
.resize:active + .line {
  opacity: 1;
}

.resize-left {
  transform: scale(-1, 100);
}

.resize-left + .line {
  left: 0;
  right: auto;
}

.resize-left ~ section {
  inset: 0 0 0 4px;
}

.el-input {
  height: 100px;
  width: 100%;
}

.right {
  /* margin-left: 80px; */
  width: 100%;
}

.el-col {
  margin: 22px;
  width: 360px;
}

.second {
  float: top;
  background-color: rgb(255, 255, 255) !important;
  width: 65px !important;
  position: fixed;
  min-height: calc(100vh);
}

.second:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;

}

.el-container {
  padding-top: 0%;
  margin-top: 0%;
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

.el-row {
  margin-left: 20px;
}

.el-submenu {
  visibility: hidden;
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

.title {
  font-size: 20px;
  font-weight: bolder;
  float: left;
  margin: 20px 0px 0px 20px;
  background-color: rgb(246, 247, 249);
  color: rgb(114, 132, 145);
  /* colorgb(5, 5, 6)55); */
  transition: 0.4s;
}
.title:hover {
  font-size: 30px;
  background-color: rgb(237, 240, 243);
  border-radius: 10px;
  padding: 0px 10px 0px 10px;
  margin: 10px 0px 10px 10px;
  cursor: pointer;
}
.title:active {
  /* font-size: 30px; */
  background-color: rgba(134, 143, 150, 0.42) !important;
  /* border-radius: 20px; */
  padding: 0px 10px 0px 10px;
  margin: 10px 0px 10px 10px;
}
.back {
  font-size: 0px;
  transition: 0.4s;
  float: left;
}
.title:hover .back{
  font-size: 30px;
  float: left;
  }

</style>