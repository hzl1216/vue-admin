<template>
    <div>
      <uploader
        browse_button="browse_button"
        :url="'/object/file/upload'"
        :multi_selection="false"
        :FilesAdded="filesAdded"
        :filters="{prevent_duplicates:true}"
        @inputUploader="inputUploader"
      />
      <el-tag type="warning">不允许选取重复文件</el-tag>
      <el-button id="browse_button" type="primary">选择文件</el-button>
      <span v-for="file in files">{{file.name}}</span>
      <el-button type="danger" @click="uploadStart()">开始上传</el-button>

      <el-dialog title="正在上传" :visible.sync="dialogTableVisible">
        <el-progress v-if="files.length>0" :text-inside="true" :stroke-width="20" :percentage="files[0].percent"></el-progress>
      </el-dialog>
      <br/>
    </div>
</template>

<script>
  import Uploader from './Uploader'
  export default {
    name: "SingleFileUpload",
    data() {
      return {
        server_config: "'/object/file/upload'",
        files:[],
        up: {},
        dialogTableVisible: false
      }
    },
    computed: {
      status() {
        return this.files.length > 0 ? this.files[0].status : null;
      }
    },
    watch: {
      status() {
        if (this.status === 5) {
          this.$confirm('文件上传成功', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          }).then(() => {
            this.dialogTableVisible = false;
          });
        }
      }
    },
    methods: {
      /**
       * setting single file limit
       * @param up
       * @param files
       */
      filesAdded(up, files) {
        if (up.files.length > 1) {
          up.removeFile(up.files[0])
        }
      },
      inputUploader(up) {
        this.up = up;
        this.files = up.files;
      },
      uploadStart() {
        this.dialogTableVisible = true;
        this.up.start();
      }
    },
    components: {
      'uploader': Uploader
    },
  }
</script>

<style scoped>

</style>
