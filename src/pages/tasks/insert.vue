<template>
  <el-form :model="form" style="width:1000px" :rules="rules"  ref="form">
    <el-form-item label="taskname" prop="taskname">
      <el-input v-model="form.taskname" placeholder="请输入taskname" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="description" prop="description">
      <el-input v-model="form.description" placeholder="请输入description" style="width:300px"></el-input>
    </el-form-item>
    
    <el-form-item label="modelname" prop="modelname">
      <select v-model="form.modelname" @change="selectFn($event)">
          <option v-for="modelname in modelnames" >{{modelname.name}}</option>
      </select>
            <p>所选择：{{form.modelname}}</p>
    </el-form-item>

    <el-form-item label="inputparams" prop="inputparams">
    <el-table :data="form.inputparams" style="width: 100%">
      <el-table-column prop="type" label="类型" width="180">
        <template slot-scope="scope">
          <el-input v-if="0" v-model="scope.row.type"></el-input>
          <span v-else>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="default" label="值" width="180">
        <template slot-scope="scope">
    <el-input v-if="1" v-model="scope.row.default"></el-input>
    <span v-else>{{scope.row.default}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="参数名" >
        <template slot-scope="scope">
    <el-input v-if="0" v-model="scope.row.name"></el-input>
    <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
    </el-table>
    </el-form-item>

    <el-form-item label="outparams" prop="outparams">
    <el-table :data="form.outparams" style="width: 100%">
      <el-table-column prop="type" label="类型" width="180">
        <template slot-scope="scope">
          <el-input v-if="0" v-model="scope.row.type"></el-input>
          <span v-else>{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="default" label="值" width="180">
        <template slot-scope="scope">
    <el-input v-if="1" v-model="scope.row.default"></el-input>
    <span v-else>{{scope.row.default}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="参数名" >
        <template slot-scope="scope">
    <el-input v-if="0" v-model="scope.row.name"></el-input>
    <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
    </el-table>
    </el-form-item>


    <!-- <el-form-item label="type" prop="type">
      <el-input v-model="form.type" placeholder="请输入type" style="width:300px"></el-input>
    </el-form-item> -->
    <el-form-item label="type" prop="type">
      <select v-model="form.type" >
          <option v-for="type in types" >{{type}}</option>
      </select>
            <p>所选择：{{form.type}}</p>
    </el-form-item>
    
    <el-form-item label="上传数据文件"  style="width:300px">
      <el-upload
        ref="uploadExcel"
        action="/object/file/upload"
        :limit=limitNum
        :auto-upload="false"
        
        :before-upload="beforeUploadFile"
        :on-change="fileChange"
        :on-exceed="exceedFile"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList">
        <el-button size="small" plain>选择文件</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
      <el-button size="small">取消</el-button>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" @click="updateHandle('form')">提交任务</el-button>
      <el-button size="small">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      types: [
        '.csv', '.tsv', '.xlsx'
      ],
      modelnames: [],
      limitNum: 100,
      formLabelWidth: '80px',
      fileList: [],
      form: {
          file: '',
          taskname: '',
          description: '',
          modelname:'',
          type: '.csv',
          inputparams:[],
          outparams:[],
        },
        rules: {
          description: [
            { required: true, message: 'description不能为空', trigger: 'blur' }
          ],
          taskname: [
            { required: true, message: 'objectId不能为空', trigger: 'blur' }
          ],
        
          type: [
            { required: true, message: 'type不能为空', trigger: 'blur' }
          ],
        }
    }
  },
  created() {
            //请求第一页数据
            this.formData = new FormData()
            this.getList()
        } ,
  
  methods: {
    getList () {            
                this.instance.getModels().then((res)=>{ 
          //成功
                this.modelnames = res.data.result;
                   
				})
      },
    mounted() {
            //请求第一页数据
            this.getList()
        },

    selected: function(type) {
      this.type = type
    },
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: '警告',
        message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
      });
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log('change')
      console.log(file)
      
      this.form.file = file.raw
      this.formData.append('file', file.raw)
      console.log(this.form.file)
      console.log(fileList)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log('before upload')
      console.log(file)
      let extension = file.name.substring(file.name.lastIndexOf('.')+1)
      let size = file.size / 1024 / 1024
    //   if(size > 10) {
    //     this.$notify.warning({
    //       title: '警告',
    //       message: `文件大小不得超过10M`
    //     });
    //   }
    },
    // 文件上传成功时的钩子
    handleSuccess(res, file, fileList) {
      this.$notify.success({
        title: '成功',
        message: `文件上传成功`
      });
    },
    // 文件上传失败时的钩子
    handleError(err, file, fileList) {
      this.$notify.error({
        title: '错误',
        message: `文件上传失败`
      });
    },
    selectFn(e) {
      console.log(e.target.selectedIndex)
      let index = e.target.selectedIndex;
      this.form.inputparams = this.modelnames[index].inputparams;
      this.form.outparams = this.modelnames[index].outparams;
                    
    },
    updateHandle (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.updatedatabase();
          }
        });
      },
    uploadFile() {
      if (!this.form.file) {
        this.$notify.warning({
          title: '警告',
          message: `请选择文件`
        });
        return;
      }

      this.instance.upload(this.formData,  { "Content-Type": "multipart/form-data" }).then(res => {
          this.filepath = res.data.path
          console.log(res);
          this.$notify.success({
        title: '成功',
        message: `文件上传成功`
      });
        }).catch(function (error) {
                    vm.$notify.error({
            title: error.response.data.error.id,
            message: error.response.data.error.message
        });
        });
    },
    updatedatabase() {
      let path = ''
        if(this.filepath){
           path = this.filepath
        }
        const data = {
          modelname: this.form.modelname,
          rawtype: this.form.type,
          taskname: this.form.taskname,
          rawurl: path,
          description: this.form.description,
          inputparams: JSON.stringify(this.form.inputparams),
          outparams: JSON.stringify(this.form.outparams)
        };
        console.log(data);
        let vm = this;
        this.instance.insertTasks(data,  {'Content-Type': 'application/x-www-form-urlencoded'}).then(res => {
          this.$notify.success({
            title: '成功',
            message: `添加成功`
          });
          console.log(res);
        }).catch(function (error) {
          vm.$notify.error({
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