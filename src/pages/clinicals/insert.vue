<template>
  <el-form :model="form" >
    <div>
      <MultiFileUpload @transferFilePath= 'getFilePath'></MultiFileUpload>
    </div>
    <el-form-item>
      <el-button size="small" type="primary" @click="updatedatabase">提交数据</el-button>
      <el-button size="small">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
import MultiFileUpload from '../../components/upload/MultiFileUpload'
export default {
  components: {
      MultiFileUpload
  },
  data() {
    return {
      
      formLabelWidth: '80px',
      form: {
        file: ''
      },
      fileList: []
    }
  },
  created() {
            //请求第一页数据
            this.formData = new FormData()
           
        } ,
  methods: {
    getFilePath(msg){
      
      let sets = new Set(msg);
      for(let lii of sets.keys()){
        this.filepath = lii;
      };
           
    },
    updatedatabase() {
        if (!this.filepath){
          this.$notify.warning({
          title: '警告',
          message: `请先上传文件`
        });
        return;
        }
        const data = {
          path: this.filepath
        }
        this.instance.insertClinicals(data,  {'Content-Type': 'application/x-www-form-urlencoded'}).then(res => {
          this.$notify.success({
            title: '成功',
            message: `添加成功`
          });
          console.log(res);
        }).catch((error)=> {
          this.$notify.error({
            title: error.response.data.error.id,
            message: error.response.data.error.message
        });
        });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>