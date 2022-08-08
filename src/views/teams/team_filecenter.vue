<template>
  <el-container>
     <div class="top">
            <aside>
                <div class="resize"></div>
                <div class="line"></div>
                <section>
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
                  :props="defaultProps"
                  class="filter-tree"
                  ref="tree"
                  @node-drag-start="handleDragStart"
                  @node-drag-enter="handleDragEnter"
                  @node-drag-leave="handleDragLeave"
                  @node-drag-over="handleDragOver"
                  @node-drag-end="handleDragEnd"
                  @node-drop="handleDrop"
                  :allow-drop="allowDrop"
                  :allow-drag="allowDrag">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button v-if="data.depth>=3"
                      type="text"
                      @click="() => append(data)">
                      <i class='el-icon-circle-plus-outline'></i>
                    </el-button>
                    <el-button v-if="data.depth>=3"
                      type="text"
                      @click="() => remove(node, data)">
                      <i class='el-icon-remove-outline'></i>
                    </el-button>
                  </span>
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
.filefolder{
  height: 670px;
  position: absolute;
  overflow: hidden;
  width: 100%;
  z-index: -1;
}
.el-input{
    width: 180px;
    position: absolute;
    left: 10px;
}
.el-input >>> .el-input__inner{
    border-radius:25px;
    font-size:15px;
}
.el-tree{
    position: absolute;
    width: 100%;
  background-color: rgb(242, 244, 245);
  overflow: hidden;
  z-index: -1;
  top: 80px;
}
.el-container{
    /* display: flex; */
    height: 100%;
    flex-direction: column;
    top: 80px;
}
.top{
    display: flex;
    flex: 1;
}
aside{
    position: relative;
    align-self: stretch;
    overflow: hidden;
}

main{
    flex: 1;
    align-self: stretch;
    background-color:#e3f2fd;
}
section{
    position: absolute;
    inset: 40px 5px 0 0;
    backdrop-filter: blur(25px) brightness(110%);
   background-color: rgb(242, 244, 245);
}
.resize{
    width: 200px;
    height: 16px;
    transform: scaleY(100);
    overflow: scroll;
    resize: horizontal;
    opacity: 0;
    max-width: 800px;
    min-width: 200px;
}
.resize-left{
    transform: scale(-1, 100);
}
.line{
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

.resize:hover+.line,
.resize:active+.line{
    opacity: 1;
}
.resize-left{
    transform: scale(-1, 100);
}
.resize-left+.line{
    left: 0;
    right: auto;
}
.resize-left~section{
    inset: 0 0 0 4px;
}


</style>

<script>
export default {
    data(){
        return{
              filterText:'',
      data: [{
          id: 1,
          label: '文档中心',
          depth: 1,
          children: [{
            id: 2,
            label: '项目文档区',
            depth: 2,
            children: [{
              id: 4,
              label: '三级 3-1-1',
              depth: 3,
            }, {
              id: 5,
              label: '三级 3-1-2',
              depth: 3,
            }]
          }, {
            id: 3,
            label: '团队文件区',
            depth: 2,
            children: [{
              id: 6,
              label: '三级 3-2-1',
              depth: 3,
            }, {
              id: 7,
              label: '三级 3-2-2',
              depth: 3,
            }]
          }]
        }],
        }
    },
  
         methods:{
              append(data) {
        const newChild = { id: data.id+1, label: 'testtest', children: [] ,depth: data.depth+1};
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


    },
     watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
}
</script>