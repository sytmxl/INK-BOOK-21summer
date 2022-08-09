<template>
  <div>
    <el-container>
      <div class="top">
        <aside>
          <div class="resize"></div>
          <div class="line"></div>
          <section>

            <div class="foldertitle">
              <h1>文档管理器</h1>
            </div>
            <div class="filefolder">
              <el-input prefix-icon="el-icon-search"
                        v-model="filterText">
              </el-input>
              <el-tree
                  :data="data"
                  node-key="id"
                  default-expand-all
                  :expand-on-click-node="false">
                <div  style="width: 100%; text-align: left"
                     class="custom-tree-node" slot-scope="{ node, data }"
                     @contextmenu.prevent="show($event,data,node)"
                     @click="getNode(data)"
                >
                  <div v-if="data.new_node == false"
                      style="width: 100%;text-align: left"
                      @contextmenu.prevent="show($event,data,node)"
                      @click="getNode(data)"
                  >
                    <i :class="data.node_icon"/>
                    <span >{{ node.label }}</span>
                  </div>
                  <span v-else style="width: 100%;text-align: left">
                    <el-input v-model="new_node_name" placeholder="请输入名称"></el-input>
                    <el-button slot="append" style="width: 20%" @click="create_new_node(data)" type="primary">新建</el-button>
                    <el-button slot="append" style="width: 20%" @click="cancel_new_node(data)">取消</el-button>
                  </span>
                </div>

              </el-tree>
            </div>
          </section>
        </aside>
        <main>
          MAIN
        </main>
      </div>
    </el-container>
  </div>
</template>

<style scoped>
.foldertitle {
  width: 100%;
  text-align: left;
}

.filefolder {
  height: 96%;
  position: absolute;
  overflow: hidden;
  overflow-y: scroll;
  width: 100%;
  border-top: 3px solid grey;
  border-bottom: 3px solid grey;
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
  width: 100%;
  background-color: rgb(242, 244, 245);
  overflow: hidden;
  top: 50px;
}

.el-container {
  /* display: flex; */
  /* height: 100%; */
  flex-direction: column;
  top: 80px;
}

.top {
  display: flex;
  flex: 1;
}

aside {
  position: relative;
  align-self: stretch;
  overflow: hidden;
}

main {
  flex: 1;
  align-self: stretch;
  background-color: #e3f2fd;
}

section {
  position: absolute;
  inset: 0px 5px 0 0;
  backdrop-filter: blur(25px) brightness(110%);
  background-color: rgb(242, 244, 245);
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

</style>

<script>
import Vue from 'vue';
import Contextmenu from "vue-contextmenujs";
import qs from "qs";
import axios from "axios";

Vue.use(Contextmenu);
export default {


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
  data() {
    return {
      new_node_parent:null,
      new_node_name:'',
      filterText: '',
      data: [],
      root_folder:null,
    }
  },
  async mounted() {
    await this.$axios({
      method: "post",
      url: "/app/get_team_root_fileid",
      data: qs.stringify({
        team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
      }),
    }).then(res=>{
      this.$data.root_folder = res.data.data.file_id;
    })
    await this.$axios({
      method: "post",
      url: "/app/get_file_content",
      data: qs.stringify({
        file_id: this.$data.root_folder,
      }),
    }).then(res=>{
      let i;
      for(i in res.data.data){
        let retData = res.data.data[i];
        let node_name;
        let node_icon;
        let node_id = retData.file_id
        // 是项目根文件夹
        if(retData.file_type == 3){
          node_name = retData.detail.project_name;
          node_icon = 'el-icon-data-analysis'
        } else if(retData.file_type == 2){
          node_name = retData.detail.doc_name;
          node_icon = 'el-icon-document'
        }else{
          node_name = retData.folder_name;
          node_icon = 'el-icon-folder'
        }
        this.$data.data.push({
          id: node_id,
          label: node_name,
          node_icon : node_icon,
          new_node : false,
          children: [],
        });
      }
    })
  },
  methods: {
    async getNode(node_data) {
      await this.$axios({
        method: "post",
        url: "/app/get_file_content",
        data: qs.stringify({
          file_id: node_data.file_id,
        }),
      }).then(res=>{
        let i;
        for(i in res.data.data){
          let retData = res.data.data[i];
          let node_name;
          let node_icon;
          // 是项目根文件夹
          if(retData.file_type == 3){
            node_name = retData.detail.project_name;
            node_icon = 'el-icon-data-analysis'
          } else if(retData.file_type == 2){
            node_name = retData.detail.doc_name;
            node_icon = 'el-icon-document'
          }else{
            node_name = retData.folder_name;
            node_icon = 'el-icon-folder'
          }

          node_data.push({
            id: retData.file_id,
            label: node_name,
            node_icon : node_icon,
            new_node : false,
            children: [],
          });
        }
      })
    },
    async append_new_node(node_data) {
      this.$data.new_node_parent = node_data;
      const newChild = { id: 233333, label: '', children: [] ,new_node:true};
      if (!node_data.children) {
        this.$set(data, 'children', []);
      }
      node_data.children.push(newChild);
    },
    async cancel_new_node(){
      this.$data.new_node_parent.children.pop();
    },
    async create_new_node(){

    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    show(event, data, node) {
      this.$contextmenu({
        items: [
          {
            label: "新建",
            divided: true,
            minWidth: 0,
            children: [{label: "新建子文件夹", onClick: () => this.append_new_node(data)}, {
              label: "新建子文件",
              onClick: () => this.append_new_node(data)
            }]
          },
          {label: "打开", disabled: true},
          {label: "另存为(A)..."},


          {label: "复制"},
          {label: "重命名"},
          {
            label: "删除",
            minWidth: 0,
            onClick: () => this.remove(node, data)
          },
        ],
        event, // 鼠标事件信息
        customClass: "custom-class", // 自定义菜单 class
        zIndex: 3, // 菜单样式 z-index
        minWidth: 230 // 主菜单最小宽度
      });
      return false;
    }


  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
}
</script>