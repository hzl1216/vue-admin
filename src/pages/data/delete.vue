<template lang="html">

  <div>
    <el-form :model="form" style="width:1000px"   ref="form">
        <el-form-item label="数据类别" prop="type">
      <select v-model="form.type" >
          <option v-for="type in types" >{{type}}</option>
      </select>
      <el-button size="small" type="primary" @click="getHandle">确认</el-button>
    </el-form-item>
    </el-form>
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
                    <td v-for='value in item'>{{value}}</td>
                    <el-button size="small" type="primary" @click="deleteobject(item)">删除</el-button>
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
            types: [
                'wes', 'rna', 'phosphoprotein', 'protein'
            ],
            form: {
                type: 'wes',
            },
        }
  },
   mounted() {
            //请求第一页数据
            this.getList()
        } ,

//   created () {
//       //this.$reqs就访问到了main.js中绑定的axios
// 				this.instance.getIndividuals().then((res)=>{ 
// 					//成功
//                     this.items = res.data;
// 				})
//   },
  methods: {
      getHandle(form){
          console.log('change');
          this.currentPage = 1
            this.getList();
      },
        getList () {
                let params = {
                    params: {
                        skip: (this.currentPage-1)*this.pageSize,
                        limit: this.pageSize,
                        type: this.form.type
                    }
                };
                console.log(params)
                this.instance.getDatas(params).then((res)=>{ 
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
        let params = {
                    params: {
                        type: this.form.type,
                        id: item.objectId,
                        tissueId: item.TissueId
                    }
                };
        this.$confirm('此操作将删除该个体和相关临床数据以及组学数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.instance.deleteData(params).then((res)=>{ 
					//成功
                    this.reload();
                })
        });
    },
     created() {
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