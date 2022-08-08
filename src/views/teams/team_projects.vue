<template>
<el-container>
  <div class="main" v-if="teamname">

    <div class="add" @click="addproject()">
      <i class="el-icon-plus" style="font-size:20px" @click="addproject()" title="添加新成员"></i>
    </div>

     <div class="folder" @click="isopen = !isopen">
      <i class="el-icon-folder" style="font-size:20px"  title="文档中心"></i>
    </div>


    <div class="filefolder" v-if="isopen" id="draggable">
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


    <div class="recent" v-if="project_list.length!=0">
      <h1 class="label label_top">近期项目</h1>
      <div class="content">
        <div v-for="i in 4" :key="i">
          <el-card class="box-card" shadow="hover" v-if="project_list[project_list.length-i]">
            <div id="tools">
              <i class="el-icon-delete" @click="deleteproject(project_list[project_list.length-i].project_id)"></i>
              <i class="el-icon-edit-outline" @click="information(project_list[project_list.length-i])"></i>
            </div>
              <h5>{{project_list[project_list.length-i].project_name}}<i class="el-icon-edit" style="font-size:20px" @click="changename(project_list[project_list.length-i].project_id)" title="重命名" ></i></h5>
              <p>创建时间：<br/>{{project_list[project_list.length-i].create_time}}</p>
              <p>最近修改时间：<br/>{{project_list[project_list.length-i].update_time}}</p>
          </el-card>   
        </div>
      </div>
    </div>

    <div class="recent" v-else>
      <h1 class="label">近期项目</h1>
      <div class="chooseteam">
        <el-empty description="你尚无项目，快去新建一个吧" :image-size="200">
        </el-empty>
      </div>
    </div>

    <div class="all" v-if="project_list.length!=0">
      <h1 class="label">全部项目</h1>
      <div v-for="item in project_list" :key="item">
        <el-card class="box-card" shadow="hover">
          <div id="tools">
            <i class="el-icon-delete" @click="deleteproject(item.project_id)"></i>
            <i class="el-icon-edit-outline" @click="information(item)"></i>
          </div>
          
          <h5>{{item.project_name}}<i class="el-icon-edit" style="font-size:20px" @click="changename(item.project_id)" title="重命名" ></i></h5>
          <p>创建时间：<br/>{{item.create_time}}</p>
          <p>最近修改时间：<br/>{{item.update_time}}</p>
        </el-card>
      </div>
    </div>
  </div>
  <div class="chooseteam" v-else>
    <el-empty description="你还有没选择你的团队，快去选择一个吧" :image-size="200"></el-empty>
  </div>
</el-container>
 
</template>

<script>
import qs from 'qs';
export default {
  inject:["reload"],
  data(){
    return{
      teamname:JSON.parse(sessionStorage.getItem('team')).team_name,
      project_list:[],
      isopen:false,
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
      changename(id){
         this.$prompt('请输入新的项目名称', '修改项目名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,20}$/,
          inputErrorMessage: '项目名称长度不合格',
          inputPlaceholder: '不超过20字',
          isMouseDown: '',
          
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '修改成功'
          });
          console.log(888);
          console.log(value);
          this.$axios({
        method: "post",
        url: "app/rename_project",
        data: qs.stringify({
          project_id: id,
          project_name: value
        }),
      })
        .then((res) => {
        
         this.reload();
          
          })
        .catch((err) => {
          console.log(err); 
        });
        }).catch(() => {
              
        });
      },
      addproject(){
         this.$prompt('请输入新项目名', '新建项目', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^.{1,20}$/,
          inputErrorMessage: '项目名称长度不合格',
          inputPlaceholder: '不超过20字'
        }).then(({ value }) => {
         
        this.$axios({
        method: "post",
        url: "app/create_project",
        data: qs.stringify({
          team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
          project_name: value
        }),
      })
        .then((res) => {
         
         var project = {project_id:res.data.data.project_id, project_name:value};
         this.$store.dispatch("saveproject", project);
         location.href = "/project_outline"
        })
        .catch((err) => {
          console.log(err); 
        });
          
     
        }).catch(() => {
              
        });
      },
      deleteproject(id){

         this.$confirm('此操作将将项目移至回收站, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        
          this.$axios({
        method: "post",
        url: "app/del_project",
        data: qs.stringify({
          project_id: id,
        }),
      })
        .then((res) => {
          if(res.data.errno ==0){
            this.$message.success(res.data.msg);
          }
          else{
            this.$message.warning(res.data.msg);
          }
          this.reload();
       
        })
        .catch((err) => {
          console.log(err); 
        });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

        
      },
      information(item){
        var project = {project_id:item.project_id, project_name:item.project_name};
        this.$store.dispatch("saveproject", project);
        location.href = "project_outline";
      },
      init(){
         this.$axios({
        method: "post",
        url: "app/get_project_list",
        data: qs.stringify({
          team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
        }),
      })
        .then((res) => {
          
          console.log(666)
         this.project_list = res.data.data.project_normal_list;
         console.log(this.project_list)
        })
        .catch((err) => {
          console.log(err); 
        });
      },
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
    mounted(){
      this.init();
    },
     watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
}
</script>

<style scoped>
.filefolder{
  width: 300px;
  height: 600px;
  position: fixed;
   backdrop-filter: blur(25px) brightness(110%);
  background-color: #53667713 !important;
  border-radius: 25px;
  right: 130px;
  top: 100px;
}
.el-input{
    width: 80%;
    margin-top: 20px;
    margin-bottom: 20px;
}
.el-input >>> .el-input__inner{
    border-radius:25px;
    font-size:15px;

}
.el-tree{
  background-color: rgb(242, 244, 245);
}
  .chooseteam{
    position: absolute;
    left: 0;
    right: 0;
  }
  .el-icon-plus:hover{
     cursor: pointer;
  }
  
   .main{
    width: 100%;
  }
  .recent{
    width: 100%;
    text-align: left;
    font-size: 36px;
    /* height: 800px; */
  }
  .all{
    width: 100%;
    text-align: left;
    font-size: 36px;
  }
  .all h1{
    margin-top: 20px;
  }
  .content{
    margin-top: 20px;
  }
  .el-icon-edit{
    cursor: pointer;
    margin-left: 5px;
  }
  .box-card p{
    font-size: 18px;
    margin-top: 15px;
  }
  .bottom{
    margin-top: 100px;
  }
  .bottom .el-button{
    border-radius: 20px;
    margin-left: 85px;
  }
  .add{
    width: 62px;
    border-radius: 20px;
    
    /* background: linear-gradient(270.6deg, #cbcddb06 -8.4%, rgba(150, 169, 183, 0.422) 100%); */
    background-color: rgb(206, 218, 226);
    font-size: 36px;
    color: black;
    text-align: center;
    
    overflow: hidden;
    transition: 0.2s;
    padding-bottom: 10px;
    float: right;
    left: 93%;
    position: fixed;
    z-index: 1;
    top: 100px;
  }
  .add:hover {
    width: 62px;
    border-radius: 50%;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 10px rgba(0, 0, 0, 0.04);
  }

    .folder{
    width: 62px;
    border-radius: 20px;
    background-color: rgb(206, 218, 226);
    font-size: 36px;
    color: black;
    text-align: center;

    overflow: hidden;
    transition: 0.2s;
    padding-bottom: 10px;
    float: right;
    left: 93%;
    position: fixed;
    z-index: 1;
    top: 160px;
  }
  .folder:hover {
    width: 62px;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 10px rgba(0, 0, 0, 0.04);
  }


  .box-card{
    width: 280px;
    height: 220px;
    margin: 15px;
    border-radius: 15px;
    text-align: left;
    padding: 0px;
    float: left;
    /* border-color: rgb(206, 218, 226) 2px; */
    transition: 0.5s;
  }
  /* .box-card:hover{
    width: 290px;
    height: 230px;
    margin: 10px;
  } */
  /* 这个悬浮效果会有一点显示bug 暂且放着吧 */
  .label {
    margin: 30px 0px 0px 30px;
    font-size: 50px;
    float: left;
    width: 100%;
    color: rgb(114, 132, 145); 
  }
  .label_top{
    margin: 10px 0px 0px 30px !important;
  }
  

#tools {
  background-color: rgb(157, 162, 176);
  color: rgba(0, 0, 0, 0);
  transition: 0.5s;
  height: 0px;
  padding: 0px;
  font-size: 0px;
  border-radius: 5px;
  text-align: center;
}

.box-card:hover #tools{
  height: 40px;
  color: rgb(0, 0, 0);
  font-size: 30px;
  margin-bottom: 20px;
}

.el-icon-delete, .el-icon-edit-outline, .el-icon-document-delete, .el-icon-magic-stick {
  color: rgb(247, 239, 239);
  border-radius: 5px;
  padding: 0px;
  transition: 0.2s;
  width: 30%;
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
.box-card:hover .el-icon-delete, .el-icon-edit-outline, .el-icon-document-delete, .el-icon-magic-stick {
  /* background-color: rgb(199, 113, 113); */
  padding: 5px;
}
.box-card h5 {
  display: inline-block;
  white-space: nowrap; 
  width: 100%; 
  overflow: hidden;
  text-overflow:ellipsis;
  transition: 0.5s;
}
.box-card:hover h5{
  white-space:unset; 
  text-overflow: unset;
  font-size: 25px;
}
</style>