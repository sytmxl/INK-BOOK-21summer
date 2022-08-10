<template>
  <el-container>

<el-main>
  <div class="main">

      <div class="cyclecenter">
    <h1 class="label"> <i class="el-icon-top" @click="backfolder2()">{{pathname}}</i></h1>

  <div v-for="item in this.files" :key="item">
    <div class="folder"  @contextmenu.prevent="show2($event,item)" v-if="(item.file_type==1&&item.folder_status==1)||(item.file_type==3&&item.detail.project_status==1)" @click="intofolder2(item)">
      <div v-if="item.file_type==3">
        <i class="el-icon-notebook-2"></i>
      <h1>{{item.detail.project_name}}</h1>
      </div>
      <div v-else-if="item.file_type==1">
         <i class="el-icon-folder"></i>
      <h1>{{item.folder_name}}</h1>
      </div>
    </div>

    <div class="file"  @contextmenu.prevent="show2($event,item)" v-else-if="item.file_type==2&&item.detail.doc_status==1">
      <i class="el-icon-document"></i>
      <h1>{{item.detail.doc_name}}</h1>
    </div>
  </div>
  </div>


  
  </div>
 
  

</el-main>
    


  </el-container>
       

</template>

<style scoped>
.label{
  font-size: 50px !important;
  text-align: left;
  margin-top: 20px;
}
.el-icon-top{
  font-size: 20px;
}
.el-icon-folder {
  font-size: 100px;
}
.el-icon-document{
  font-size: 100px;
}
.el-icon-notebook-2{
  font-size: 100px;
}
.folder{
  float: left;
  margin-top: 30px;
  margin-left: 50px;
}
.file{
  float: left;
  margin-top: 30px;
  margin-left: 50px;
}
.label:hover,.folder:hover,.file:hover{
  cursor: pointer;
}

</style>

<script>
import Vue from 'vue';
import Contextmenu from "vue-contextmenujs";
import qs from "qs";
Vue.use(Contextmenu);
export default {
  inject:['reload'],
    data(){
      return{
        files:[],
        this_id:'',
        root_id:'',
        pathname:JSON.parse(sessionStorage.getItem('delfolderid')).path_name,
      }
    },
    methods:{
      async init(){
      if(JSON.parse(sessionStorage.getItem('delfolderid'))==null){
        this.getRootNode();
      }
      else{
        this.getAllFile(JSON.parse(sessionStorage.getItem('delfolderid')).this_id);
      }
      },
      getfatherid(file_id,name){
         this.$axios({
        method: "post",
        url: "/app/get_file_parentid",
        data: qs.stringify({
          file_id: file_id,
        }),
      })
        .then((res) => {
          this.$store.dispatch('savedelfolderid',{root_id:this.root_id,last_id:res.data.data.parent_id,this_id:file_id,path_name:name});
           this.pathname = JSON.parse(sessionStorage.getItem('delfolderid')).path_name; 
        })
        .catch((err) => {
          
        });
      },
      async getRootNode(){
      this.$axios({
        method: "post",
        url: "/app/get_team_root_fileid",
        data: qs.stringify({
          team_id: JSON.parse(sessionStorage.getItem('team')).team_id,
        }),
      })
        .then((res) => {
          this.$store.dispatch('savedelfolderid',{root_id:res.data.data.file_id,last_id:res.data.data.file_id,this_id:res.data.data.file_id,path_name:'回收中心'});
          //  this.getAllFile(res.data.data.file_id);
          location.reload();
        })
        .catch((err) => {
          
        });

      },
      async getAllFile(file_id){
         this.pathname = JSON.parse(sessionStorage.getItem('delfolderid')).path_name; 
      await this.$axios({
        method: "post",
        url: "/app/get_file_content",
        data: qs.stringify({
          file_id: file_id,
          allow_recycle: true
        }),
      })
        .then((res) => {
         this.files = res.data.data;
        })
        .catch((err) => {
          
        });
      },
      async intofolder2(item){
        if(item!=null){
          var last = item.parent_id;
         var now = item.file_id;
         console.log(now);
        }
      if(item.file_type==3){
        this.$store.dispatch('savedelfolderid',{root_id:this.root_id,last_id:last,this_id:now,path_name:this.pathname+'/'+item.detail.project_name});
      }
      else if(item.file_type==1){
        this.$store.dispatch('savedelfolderid',{root_id:this.root_id,last_id:last,this_id:now,path_name:this.pathname+'/'+item.folder_name});
      }

        await this.getAllFile(JSON.parse(sessionStorage.getItem('delfolderid')).this_id);
      },

      async backfolder2(){
        var now = JSON.parse(sessionStorage.getItem('delfolderid')).last_id; 
        var n = this.pathname.lastIndexOf("/");
        var name = this.pathname.substr(0,n);
        if(this.pathname=='文档中心'){
          this.$message.warning("已经到了最顶部");
          console.log(this.pathname)
        }
        else{
            await this.getfatherid(now,name);
            await this.getAllFile(now);
        }
      
      },
        restore(item){
            if(item.file_type==1){
                this.$message.warning("文件夹暂时无法恢复");
            }
            else if(item.file_type==2){ //document
             this.$confirm('此操作将恢复该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {

                    this.$axios({
                  method: "post",
                  url: "/app/recycle_doc",
                  data: qs.stringify({
                    doc_id: item.detail.doc_id,
                  }),
                })
                  .then((res) => {
                   this.$message.success("恢复成功");
                   location.reload();
                  })
                  .catch((err) => {

                  });

                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消恢复'
                    });          
                  });
            }
            else if(item.file_type==3){
             this.$confirm('此操作将恢复该项目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {

                    this.$axios({
                  method: "post",
                  url: "app/recycle_project",
                  data: qs.stringify({
                    project_id: item.detail.project_id,
                  }),
                })
                  .then((res) => {
                   this.$message.success("恢复成功");
                   location.reload();
                  })
                  .catch((err) => {

                  });

                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消恢复'
                    });          
                  });
            }

        },
        delete(item){
             if(item.file_type==1){
                this.$message.warning("文件夹暂时无法恢复");
            }
            else if(item.file_type==2){ //document
             this.$confirm('此操作将彻底删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {

                    this.$axios({
                  method: "post",
                  url: "/app/permanent_del_doc",
                  data: qs.stringify({
                    doc_id: item.detail.doc_id,
                  }),
                })
                  .then((res) => {
                   this.$message.success("删除成功");
                   location.reload();
                  })
                  .catch((err) => {

                  });

                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消恢复'
                    });          
                  });
            }
            else if(item.file_type==3){
             this.$confirm('此操作将彻底删除该项目, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {

                    this.$axios({
                  method: "post",
                  url: "app/permanent_del_project",
                  data: qs.stringify({
                    project_id: item.detail.project_id,
                  }),
                })
                  .then((res) => {
                   this.$message.success("删除成功");
                   location.reload();
                  })
                  .catch((err) => {

                  });

                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消恢复'
                    });          
                  });
            }
        },
         show2(event,item) {
      this.$contextmenu({
        items: [
          {label: "打开",
          onClick:() => this.intofolder(item)},
           {
            label: "恢复",
            onClick:() => {
                this.restore(item);
            }
          },
          {
            label: "删除",
            onClick:() => {
                this.delete(item);
            }
          },
        ],
        event, // 鼠标事件信息
        customClass: "custom-class", // 自定义菜单 class
        zIndex: 3, // 菜单样式 z-index
        minWidth: 230 // 主菜单最小宽度
      });
      return false;
    },


 
    },
   async mounted(){
    this.init();
   },
   destroyed(){
    sessionStorage.removeItem('delfolderid');
   }
   
}
</script>