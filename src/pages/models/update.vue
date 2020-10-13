<template>
  <el-form :model="form" style="width:1000px" :rules="rules"  ref="form">
    <el-form-item label="modelname" prop="modelname">
      <el-input v-model="form.modelname" placeholder="请输入modelname" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="更改描述" prop="description">
      <el-input v-model="form.description" placeholder="请输入description" style="width:300px"></el-input>
    </el-form-item>
    
    <el-form-item label="更改状态" prop="status">
      <select v-model="form.status" >
          <option v-for="status in statuses" >{{status}}</option>
      </select>
            <p>所选择：{{form.status}}</p>
    </el-form-item>
    
    <div>
      <el-tag type="warning">更新模型文件</el-tag>
      <MultiFileUpload @transferFilePath= 'getFilePath'></MultiFileUpload>
    </div>
    <el-form-item>
      <el-button size="small" type="primary" @click="updateHandle('form')">提交更改</el-button>
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
      statuses: [
        '待审核', '已审核'
      ],
      limitNum: 1,
      formLabelWidth: '80px',
      fileList: [],
      form: {
          file: '',
          modelname: '',
          description: '',
          
          status: '待审核',
        },
        rules: {
          
          modelname: [
            { required: true, message: 'objectId不能为空', trigger: 'blur' }
          ],
                  
        }
    }
  },
  methods: {
    selected: function(type) {
      this.type = type
    },

     getFilePath(msg){
      
      let sets = new Set(msg);
      for(let lii of sets.keys()){
        this.filepath = lii;
      };
           
    },

    updateHandle (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.updatedatabase();
          }
        });
      },
    updatedatabase() {
        let path = ''
        if(this.filepath){
           path = this.filepath
        }
        const data = {
          
          status: this.form.status,
          modelname: this.form.modelname,
          modelurl: path,
          description: this.form.description
        };
        console.log(data);
        this.instance.updateModels(data,  {'Content-Type': 'application/x-www-form-urlencoded'}).then(res => {
          this.$notify.success({
            title: '成功',
            message: `更改成功`
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