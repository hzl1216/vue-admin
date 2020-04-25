<template>
  <div class="bar">
    <div class="bar-list">
      <el-upload

  class="upload-demo"

  action="//jsonplaceholder.typicode.com/posts/"

  :on-preview="handlePreview"

  :on-remove="handleRemove"

  :file-list="fileList">

  <el-button size="small" type="primary">点击上传</el-button>

  <div slot="tip" class="el-upload__tip">只能上传tsv件</div>

</el-upload>
    </div>
  </div>
</template>
<script>

  export default {
    name: 'myUpload',
    data() {

      return {

        fileList: []

      };

    },

    methods: {

      handleRemove(file, fileList) {

        console.log(file, fileList);

      },

      handlePreview(file) {

        console.log(file);

      }

    }

  }

</script>