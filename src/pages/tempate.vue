<template>
  <div class="new_con">
    <el-card class="box-card">
      <el-form
        :model="sjgxform"
        class="form_protocol"
        label-position="right"
        style="margin:0 auto;width:80%"
      >
        <el-form-item label="大文件上传" style="text-align: left;">
          <div class="hello"  style="width:75%;margin-left:27px;display: inline-block;">
            <div class="operbuttongroup" >
              <file-upload
                isAutoUpload="true"
                isMultiple="false"
                state="ADD"
                :fileUploadURL="fileUploadURL"
                :histFileArr="histFileArr"
                @fileDelOper="fileDelOper"
                @fileDownload="fileDownload"
                @successvalue='successvalue'
              ></file-upload>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import FileUpload from "../components/upload/index";
export default {
  components: {
    FileUpload
  },
  computed: {
  },
  data() {
    return {
      
 
      //大文件上传
      fileUploadURL: '',
      histFileArr: [] // 已有附件集合
    };
  },
 
  watch: {
  },
  methods: {
    
 
    
    //大文件上传
    fileDelOper(val) {},
    fileDownload(val) {},
    successvalue(val) {
      console.log(val,"大文件上传成功了，然后就可以看到返回的值了")
      this.sjgxform.fjList.push({
        PID: this.$route.query.id,
        WDFL: "3",
        WDMC: val.WDMC,
        WJLJ: val.WJLJ,
        CJRID: this.$store.state.Login.userInfo.ID
      });
 
    }
  },
  mounted() {
   
  }
};
</script>
<style scoped>