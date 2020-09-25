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
            items: []
      }
  },
   created() {
            //请求第一页数据
            this.getList()
        } ,
  methods: {
        getList () {
                let params = {
                    params: {
                        skip: (this.currentPage-1)*this.pageSize,
                        limit: this.pageSize
                    }
                };
                console.log(params)
                this.instance.getDrugs(params).then((res)=>{ 
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
        this.$confirm('此操作将删除该药物和相关靶点数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        this.instance.deleteDrug(item.DrugName).then((res)=>{ 
					//成功
                    this.reload();
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