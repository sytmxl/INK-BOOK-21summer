<template>
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
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                class="filter-tree"
                ref="tree"
                @node-click="getNode"
                >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span @contextmenu.prevent="show($event,data,node)">{{ node.label }}</span>
                </span>
            </el-tree>
          </div>
        </section>
      </aside>
      <main>
        MAIN
      </main>
    </div>
  </el-container>


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


</style>

<script>
import Vue from 'vue';
import Contextmenu from "vue-contextmenujs";
import qs from "qs";

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
      filterText: '',
      data: [],
      root_folder:null,
    }
  },
  mounted() {
    this.$axios({
      method: "post",
      url: "/app/get_team_root_fileid",
      data: qs.stringify({
        team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
      }),
    }).then(res=>{
      this.$data.root_folder = res.data.data.file_id;
    })
    this.getNode(this.$data.root_folder);
  },
  methods: {
    async getNode(node_data,node,elm) {
      await this.$axios({
        method: "post",
        url: "/app/get_file_content",
        data: qs.stringify({
          file_id: node_data.file_id,
        }),
      }).then(res=>{
        let retData = res.data.data
        let i;
        for(i in retData){
          node_data.append(retData[i]);s
        }
      })
    },
    append(data) {
      const newChild = {id: data.id + 1, label: 'testtest', children: [], depth: data.depth + 1};
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
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
            children: [{label: "新建子文件夹", onClick: () => this.append(data)}, {
              label: "新建子文件",
              onClick: () => this.append(data)
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