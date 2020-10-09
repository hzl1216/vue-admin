<template lang="html">
  <div>
    <div class='main'>
        <table class="table table-bordered table-hover table-condensed">
            <thead style="background-color:lightgray;">
                <tr>
                    <th  v-for='(value, key) in items[0]'>{{key}}</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                    <td v-for='(value, key) in item'>
                        <div>
                        <div  v-if= ' shows[key]==0'>{{value}}</div>
                        <button v-if = 'shows[key]==1' @click='download1(item[key])'>下载结果</button>
                        </div>
                    </td>
                    <el-button size="small" type="primary" @click="deleteobject(item)">执行</el-button>
                </tr>
            </tbody>
        </table>
         <mo-paging 
            :page-index="currentPage" 
            :total="count" 
            :page-size="pageSize" 
            @change="pageChange">
            </mo-paging>
    </div>
  </div>
</template>

<script>
import MoPaging from '../../components/paging'
export default {
    components : {
            MoPaging 
        },
  inject: ['reload'],
  data () {
         return {
            pageSize : 10, //每页显示20条数据
            currentPage : 1, //当前页码
            count : 0,
            items: [],
            shows: {'name':0,'description':0, 'model':0, 'outparams':1, 'status': 0, 'stdout': 0,'createdAt': 0, 'inputparams': 0, 'id':0,}
      }
  },
   created() {
            //请求第一页数据
            this.getList()
        } ,
  methods: {
        download1 (paths) {
            if(!sessionStorage.getItem('token')){
              this.$router.push('/login');
            }else{
            console.log(paths)
            for(const path of paths){
            console.log(path)
            let params = {
                    params: {
                        path: path.value
                    }
                };
                console.log(params)
                this.instance.download(params).then((res)=>{ 
                  console.log(res.data)
                  this.downloadfile(res.data,path.split("/").pop());
                });
            }
            }
        },
        
        downloadfile (data,fileName) {
        if (!data) {
            return
        }
        let url = window.URL.createObjectURL(new Blob([data]));
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download',fileName);
        document.body.appendChild(link);
        link.click();
        },
        
        getList () {
                let params = {
                    params: {
                        skip: (this.currentPage-1)*this.pageSize,
                        limit: this.pageSize
                    }
                };
                console.log(params)
                this.instance.getTasks(params).then((res)=>{ 
					//成功
                    this.items = res.data.result;
                    this.count = res.data.count;
				})
            },
        pageChange (page) {
                this.currentPage = page
                this.getList()
            },
   
    // 文件超出个数限制时的钩子
    deleteobject(item) {
        this.$confirm('此操作将执行该模型, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        let params = {
                    
                        id: item.id,
                        status: '执行中'
                    
                };
              
        console.log(params)
        this.instance.updateStatus(params,  {'Content-Type': 'application/x-www-form-urlencoded'}).then((res)=>{ 
					//成功
                    console.log(res);
                })
        });
    },
     mounted() {
            //请求第一页数据
            this.getList()
        } 
  }
}
</script>

<style src='src/assets/styles/bootstrap.min.css'></style>

<style lang="css" scoped>
.main { /* it is for tree that be in center*/
		margin-left: 5%; margin-bottom: 5%; margin-top: 5%;
	}
</style>