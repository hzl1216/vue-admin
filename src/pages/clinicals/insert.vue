<template>
  <el-form :model="form" >
    <el-form-item label="上传文件" :label-width="formLabelWidth">
      <el-upload
        ref="uploadExcel"
        action="/object/file/upload"
        :limit=limitNum
        :auto-upload="false"
        accept=".tsv"
        :before-upload="beforeUploadFile"
        :on-change="fileChange"
        :on-exceed="exceedFile"
        :on-success="handleSuccess"
        :on-error="handleError"
        :file-list="fileList">
        <el-button size="small" plain>选择文件</el-button>
        <div  class="el-upload__tip">只能上传tsv文件</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" @click="uploadFile">立即上传</el-button>
      <el-button size="small">取消</el-button>
    </el-form-item>
    <el-form-item>
      <el-button size="small" type="primary" @click="updatedatabase">提交数据</el-button>
      <el-button size="small">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      limitNum: 1,
      formLabelWidth: '80px',
      form: {
        file: ''
      },
      fileList: []
    }
  },
  methods: {
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
      console.log(this.form.file)
      console.log(fileList)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log('before upload')
      console.log(file)
      let extension = file.name.substring(file.name.lastIndexOf('.')+1)
      let size = file.size / 1024 / 1024
      if(extension !== 'tsv') {
        this.$notify.warning({
          title: '警告',
          message: `只能上传tsv（即后缀是.tsv）的文件`
        });
      }
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
    uploadFile() {
 
      let formData = new FormData()
      if (!this.form.file) {
        this.$notify.warning({
          title: '警告',
          message: `请选择文件`
        });
        return;
      }
      formData.append('file', this.form.file)
      this.instance.upload(formData,  { "Content-Type": "multipart/form-data" }).then(res => {
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
        let vm = this;
        this.instance.insertClinicals(data,  {'Content-Type': 'application/x-www-form-urlencoded'}).then(res => {
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