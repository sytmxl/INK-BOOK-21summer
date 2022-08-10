<template>
  <el-container>

<el-main>
  <div class="addfolder" >
      <i class="el-icon-folder-add" style="font-size:20px"  title="新建文件夹"></i>
    </div>
    <div class="addfile" >
      <i class="el-icon-document-add" style="font-size:20px"  title="新建文件"></i>
    </div>
  <h1 class="label">文档中心 <i class="el-icon-top" @dblclick="backfolder()">返回上层目录</i></h1>

  <div v-for="item in this.files" :key="item">
    <div class="folder"  @contextmenu.prevent="show($event,item)" v-if="item.file_type!=2" @dblclick="intofolder(item)">
      <i class="el-icon-folder"></i>
      <h1>{{item.detail.project_name}}</h1>
    </div>

    <div class="file"  @contextmenu.prevent="show($event,item)" v-else>
      <i class="el-icon-document"></i>
      <h1>{{item.detail.doc_name}}</h1>
    </div>
  </div>
 

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
        root_id:''
      }
    },
    methods:{
      init(){
      if(JSON.parse(sessionStorage.getItem('folderid'))==null){
        this.getRootNode();
      }
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
          this.$store.dispatch('savefolderid',{root_id:res.data.data.file_id,last_id:res.data.data.file_id,this_id:res.data.data.file_id});
           this.this_id = res.data.data.file_id;
           this.root_id = res.data.data.file_id;
           this.getAllFile(this.this_id);
        })
        .catch((err) => {
          
        });
      },
      async getAllFile(file_id){
      this.$axios({
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
    
        this.$store.dispatch('savefolderid',{root_id:this.root_id,last_id:last,this_id:now});
      // await this.reload();
        // await this.init();
        await this.getAllFile(JSON.parse(sessionStorage.getItem('folderid')).this_id);
      },
      async backfolder(){
        console.log(this.files)
        if(this.files.length>0){
          var now = this.files[0].parent_id;
        }
        else{
          var now = JSON.parse(sessionStorage.getItem('folderid')).last_id;
        }
         this.$store.dispatch('savefolderid',{root_id:this.root_id,last_id:'',this_id:now});
        // this.reload();
        await this.getAllFile(JSON.parse(sessionStorage.getItem('folderid')).this_id);
      },
       show(event,item) {
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
          {label: "打开",
          onClick:() => this.intofolder(item)},
          {label: "另存为(A)..."},


          {label: "复制"},
          {label: "重命名"},
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
    }
    },
   async mounted(){
    this.init();
   },
   destroyed(){
    sessionStorage.removeItem('folderid');
   }
   
}
</script>