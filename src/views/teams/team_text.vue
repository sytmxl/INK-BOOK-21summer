<template>
  <el-container>

<el-main>
  <div class="addfolder" @click="newfolderVisible=true">
      <i class="el-icon-folder-add" style="font-size:20px"  title="新建文件夹"></i>
    </div>
    <div class="addfile" @click="newfileVisible=true">
      <i class="el-icon-document-add" style="font-size:20px"  title="新建文件"></i>
    </div>
  <h1 class="label"> <i class="el-icon-top" @click="backfolder()">{{pathname}}</i></h1>

  <div v-for="item in this.files" :key="item">
    <div class="folder"  @contextmenu.prevent="show1($event,item)" v-if="item.file_type==1||item.file_type==3" @dblclick="intofolder(item)">
      <i class="el-icon-folder"></i>
      <h1 v-if="item.file_type==3">{{item.detail.project_name}}</h1>
      <h1 v-else-if="item.file_type==1">{{item.folder_name}}</h1>
    </div>

    <div class="file"  @contextmenu.prevent="show1($event,item)" v-else-if="item.file_type==2">
      <i class="el-icon-document"></i>
      <h1>{{item.detail.doc_name}}</h1>
    </div>
  </div>
 

 <el-dialog
  title="新建文件夹"
  :visible.sync="newfolderVisible"
  width="30%"
  :before-close="handleClose">
    <el-input
        placeholder="请输入新文件夹名称"
        v-model="newfoldername"
        maxlength="20"
        show-word-limit
        clearable>
    </el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="newfolderVisible = false">取 消</el-button>
    <el-button type="primary" @click="newfolder()">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="新建文件"
  :visible.sync="newfileVisible"
  width="30%"
  :before-close="handleClose">
    <el-input
        placeholder="请输入新文件名称"
        v-model="newfilename"
        maxlength="20"
        show-word-limit
        clearable>
    </el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="newfileVisible = false">取 消</el-button>
    <el-button type="primary" @click="newfile()">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="重命名文件"
  
  :visible.sync="renameVisible"
  width="30%"
  :before-close="handleClose">
    <el-input
        placeholder="请输入新文件名称"
        v-model="renewname"
        maxlength="20"
        show-word-limit
        clearable>
    </el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="renameVisible = false">取 消</el-button>
    <el-button type="primary" @click="rename(needrenameitem,renewname)">确 定</el-button>
  </span>
</el-dialog>

</el-main>
    


  </el-container>
       

</template>

<style scoped>
.label{
  font-size: 50px;
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
.addfolder{
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
    top: 100px;
  }
  .addfile{
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
    top: 180px;
  }
  .addfolder:hover,.addfile:hover{
    width: 62px;
    border-radius: 50%;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 10px rgba(0, 0, 0, 0.04);
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
        newfolderVisible: false,
        newfileVisible: false,
        renameVisible:false,
        newfoldername:'',
        newfilename:'',
        renewname:'',
        needrenameitem:'',
        pathname:JSON.parse(sessionStorage.getItem('folderid')).path_name,
      }
    },
    methods:{
      async init(){
      if(JSON.parse(sessionStorage.getItem('folderid'))==null){
        this.getRootNode();
      }
      else{
        this.getAllFile(JSON.parse(sessionStorage.getItem('folderid')).this_id);
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
          this.$store.dispatch('savefolderid',{root_id:this.root_id,last_id:res.data.data.parent_id,this_id:file_id,path_name:name});
           this.pathname = JSON.parse(sessionStorage.getItem('folderid')).path_name; 
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
          this.$store.dispatch('savefolderid',{root_id:res.data.data.file_id,last_id:res.data.data.file_id,this_id:res.data.data.file_id,path_name:'文档中心'});
          //  this.getAllFile(res.data.data.file_id);
          location.reload();
        })
        .catch((err) => {
          
        });

      },
      async getAllFile(file_id){
         this.pathname = JSON.parse(sessionStorage.getItem('folderid')).path_name; 
      await this.$axios({
        method: "post",
        url: "/app/get_file_content",
        data: qs.stringify({
          file_id: file_id,
        }),
      })
        .then((res) => {
         this.files = res.data.data;
        })
        .catch((err) => {
          
        });
      },
      async intofolder(item){
        if(item!=null){
          var last = item.parent_id;
         var now = item.file_id;
         console.log(now);
        }
      if(item.file_type==3){
        this.$store.dispatch('savefolderid',{root_id:this.root_id,last_id:last,this_id:now,path_name:this.pathname+'/'+item.detail.project_name});
      }
      else if(item.file_type==1){
        this.$store.dispatch('savefolderid',{root_id:this.root_id,last_id:last,this_id:now,path_name:this.pathname+'/'+item.folder_name});
      }

        await this.getAllFile(JSON.parse(sessionStorage.getItem('folderid')).this_id);
      },

      async backfolder(){
        var now = JSON.parse(sessionStorage.getItem('folderid')).last_id; 
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
       show(event) {
      this.$contextmenu({
        items: [
          {
            label: "新建",
            divided: true,
            minWidth: 0,
            children: [{label: "新建子文件夹"}, {
              label: "新建子文件",
              
            }]
          },
        ],
        event, // 鼠标事件信息
        customClass: "custom-class", // 自定义菜单 class
        zIndex: 3, // 菜单样式 z-index
        minWidth: 230 // 主菜单最小宽度
      });
      return false;
    },
        show1(event,item) {
      this.$contextmenu({
        items: [
          {label: "打开",
          onClick:() => this.intofolder(item)},
          {label: "剪切",
          onClick:() =>{
            this.cut(item);
          }},
          {label: "复制",
          onClick:() =>{
            this.copy(item);
          }},
          {label: "粘贴",
          onClick:() =>{
            this.paste(item);
          }},
          {label: "重命名",
          onClick:() => {
            setTimeout(() => {
                this.renameVisible = true;
            },500)
            this.needrenameitem = item;
            // this.renameVisible = true;
            console.log(this.needrenameitem)
          }},
          {
            label: "删除",
            minWidth: 0,
          },
        ],
        event, // 鼠标事件信息
        customClass: "custom-class", // 自定义菜单 class
        zIndex: 3, // 菜单样式 z-index
        minWidth: 230 // 主菜单最小宽度
      });
      return false;
    },
    newfile(){
      this.newfileVisible = false;
       this.$axios({
        method: "post",
        url: "/app/create_doc",
        data: qs.stringify({
          folder_id:JSON.parse(sessionStorage.getItem('folderid')).this_id,
          create_method: "folder_id",
          doc_name: this.newfilename
        }),
      })
        .then((res) => {
          if(res.data.errno==0){
            this.$message.success(res.data.msg);
            this.getAllFile(JSON.parse(sessionStorage.getItem('folderid')).this_id);
          }
          else{
            this.$message.warning(res.data.msg);
          }
        })
        .catch((err) => {
          
        });
    },
    newfolder(){
      this.newfolderVisible = false;
      this.$axios({
        method: "post",
        url: "/app/create_folder",
        data: qs.stringify({
          folder_id: JSON.parse(sessionStorage.getItem('folderid')).this_id,
          new_folder_name:this.newfoldername
        }),
      })
        .then((res) => {
           if(res.data.errno==0){
            this.$message.success(res.data.msg);
            this.getAllFile(JSON.parse(sessionStorage.getItem('folderid')).this_id);
          }
          else{
            this.$message.warning(res.data.msg);
          }
        })
        .catch((err) => {
          
        });
    },
    rename(item,newname){
      this.renameVisible = false;
      if(item.file_type==2){
        this.$axios({
        method: "post",
        url: "/app/rename_doc",
        data: qs.stringify({
          doc_id: item.file_id,
          doc_name: newname
        }),
      })
        .then((res) => {
        if(res.data.errno==0){
            this.$message.success(res.data.msg);
            this.getAllFile(JSON.parse(sessionStorage.getItem('folderid')).this_id);
          }
          else{
            this.$message.warning(res.data.msg);
          }
        })
        .catch((err) => {
          
        });
      }
      else if(item.file_type==1){
        this.$axios({
        method: "post",
        url: "/app/rename_folder",
        data: qs.stringify({
          file_id: item.file_id,
          folder_name:newname,
        }),
      })
        .then((res) => {
         this.getAllFile(JSON.parse(sessionStorage.getItem('folderid')).this_id);
        })
        .catch((err) => {
          
        });
      }
      else if(item.file_type==3){
         this.$axios({
        method: "post",
        url: "/app/rename_project",
        data: qs.stringify({
          project_id: item.detail.project_id,
          project_name:newname,
        }),
      })
        .then((res) => {
         this.getAllFile(JSON.parse(sessionStorage.getItem('folderid')).this_id);
        })
        .catch((err) => {
          
        });
      }
    },
    copy(item){
      this.$store.dispatch('savecopy',{file_id:item.detail.doc_id,op:'copy'});
      this.$message.success("复制成功");
    },
    cut(item){
      this.$store.dispatch('savecopy',{file_id:item.file_id,op:'cut'});
      this.$message.success("剪切成功");
    },
    paste(item){
      var op = JSON.parse(sessionStorage.getItem('copy')).op;
      var dest = item.file_id;
      if(op=='copy'){
        this.$axios({
        method: "post",
        url: "/app/copy_doc",
        data: qs.stringify({
          folder_id:dest,
          doc_id: JSON.parse(sessionStorage.getItem('copy')).file_id
        }),
      })
        .then((res) => {
          if(res.data.errno==0){
            this.$message.success(res.data.msg);
            this.getAllFile(JSON.parse(sessionStorage.getItem('folderid')).this_id);
          }
          else{
            console.log(res.data.errno);
            this.$message.warning(res.data.msg);
          }
           
        })
        .catch((err) => {
          
        });
      }
      else if(op=='cut'){
        this.$axios({
        method: "post",
        url: "/app/move_file",
        data: qs.stringify({
          file_id:JSON.parse(sessionStorage.getItem('copy')).file_id,
          target_dirid: item.file_id
        }),
      })
        .then((res) => {
           if(res.data.errno==0){
            this.$message.success(res.data.msg);
            this.getAllFile(JSON.parse(sessionStorage.getItem('folderid')).this_id);
          }
          else{
            this.$message.warning(res.data.msg);
          }
        })
        .catch((err) => {
          
        });
      }
    },
 
    },
   async mounted(){
    this.init();
   },
   destroyed(){
    sessionStorage.removeItem('folderid');
    sessionStorage.removeItem('copy');
   }
   
}
</script>