<template>
    <div class="fileuploadbase">
        <div class="fileuploadgroup">
            <input type="file" name="file" id="fileinput" @change="fileUploadChanged" :multiple='false' style="display: none;" />
            <el-button @click="fileButtonClick()" :disabled="!isUploadClick || (state!='ADD'&&state!='EDIT')" icon="el-icon-upload" size="mini" plain style='width"96px;height:38px;font-size: 14px;'>{{fileButtonText}}</el-button>
            <div class="currentfilename" v-if="!isAutoUpload">{{ waitUploadFile }}</div>
            <el-button @click="fileUploadStartup" v-show="isFileUploadStartupBottonShow" v-if="!isAutoUpload" size="mini" plain>点击上传</el-button>
        </div>
        <div v-show="currentFileName.length > 0">
            <div class="fileuploadgroup" v-for="(item, index) in currentFileName" :key="index">
                <div class="currentfilename" @click="handleFileDownloadClick(item)">{{ item.name }}</div>
                <el-progress :text-inside="true" :stroke-width="18" :percentage="percentage" class="elprogress" v-show="isProgressVis && index==(currentFileName.length-1)"></el-progress>
                <i class="el-icon-delete" title="删除文件" @click="handleFileDelClick(item)" v-show="isDeleteIconShow && (!isProgressVis || index!=(currentFileName.length-1)) && (state=='ADD'||state=='EDIT')" :style="{cursor: 'pointer'}"></i>
            </div>
        </div>
    </div>
</template>
<script>
// import fileUpload from "./file-upload.js"
import fileUpload from "../../assets/js/fileUpload"
export default {
    name: "file-upload",
    data() {
        return {
            percentage: 0,
            filesdata: [],  // 
            fileUpload,
            isDeleteIconShow: false,
            isFileUploadStartupBottonShow: false,
            isProgressVis: false,
            currentFileName: [],
            waitUploadFile: "",
            isUploadClick: true
        }
    },
    props: {
        // 上传方式：true - 自动上传；false - 手动上传
        isAutoUpload: {
            type: String,
            default: true,
        },
        // 单/多文件：true - 多文件；false - 单文件
        isMultiple: {
            type: String,
            default: false,
        },
        // 状态：ADD - 新建；READ - 查看；EDIT - 修改
        state: {
            type: String,
            default: null,
        },
        // 上传服务地址
        fileUploadURL: {
            type: String,
            default: null,
        },
        // 已有附件集合
        histFileArr: {
            type: Array,
            default: [],
        }
    },
    computed: {
        fileButtonText() {
            if (this.currentFileName.length == 0) {
                return '上传数据';
            } else {
                return '继续添加';
            }
        }
    },
    methods: {
        fileUploadChanged() {
            this.filesdata = this.$el.getElementsByTagName("input")[0].files;//this.$el.getElementsByTagName方法可返回带有指定标签名的对象的集合。
            if (this.filesdata.length == 0) return;
            this.isDeleteIconShow = true;
            this.isFileUploadStartupBottonShow = true;
            this.isProgressVis = false;
            this.percentage = 0;
            this.waitUploadFile = this.filesdata[0].name;
            if (this.isAutoUpload) {
                this.fileUploadStartup();
            }
        },
        fileUploadStartup() {
            this.isUploadClick = false;
            this.isDeleteIconShow = false;
            this.isFileUploadStartupBottonShow = false;
            if (!this.isMultiple) {
                this.fileDelOper(this.currentFileName[0]);// 进行删除操作
                this.currentFileName = [];
            }
            this.isProgressVis = true;
            this.currentFileName.push({ name: this.filesdata[0].name });
            this.fileUpload = new fileUpload(this.fileUploadURL);
            console.log(this.filesdata[0],"this.filesdata[0]")
            this.fileUpload.upLoad(this.filesdata[0],this.formatTime(new Date()));
            this.fileUpload.percentageSend = this.percentageSend;
            this.fileUpload.successUpload = this.successUpload;
        },
        //接收上传的百分值回调
        percentageSend(perNum) {
            this.percentage = perNum;
        },
        successUpload(success, field,value) {
            if (success) {
                if (this.percentage < 100) return;
                this.isDeleteIconShow = true;
                this.isFileUploadStartupBottonShow = false;
                this.isProgressVis = false;
                this.isUploadClick = true;
                document.getElementById("fileinput").value = "";
                this.waitUploadFile = "";
                this.successvalue=value
                this.$emit('successvalue',this.successvalue);   
                this.$message({
                    message: '文件上传成功',
                    type: 'success'
                });
            }
 
        },
        // 点击文件后面的删除按钮
        handleFileDelClick(item) {
            this.filesdata = [];
            document.getElementById("fileinput").value = "";
            for (let i = 0; i < this.currentFileName.length; i++) {
                if (this.currentFileName[i].name == item.name) {
                    this.fileDelOper(item);// 进行删除操作
                    this.currentFileName.splice(i, 1); //删除下标为i的元素
                    return this.currentFileName;
                }
            }
            this.isDeleteIconShow = false;
            this.isFileUploadStartupBottonShow = false;
            this.isProgressVis = false;
        },
        // 点击选取文件
        fileButtonClick() {
            document.getElementById('fileinput').click();
        },
        // 删除操作
        fileDelOper(val) {
            this.$emit("fileDelOper", val);
        },
        // 点击文件下载
        handleFileDownloadClick(val) {
            this.$emit("fileDownload",val);
        }
    },
    watch: {
        histFileArr() {
            if (!this.histFileArr) {
                this.isDeleteIconShow = false;
                this.currentFileName = [];
                return;
            }
            this.isDeleteIconShow = true;
            this.currentFileName = this.histFileArr;
        }
    },
    created() {
        if (!this.histFileArr) {
            this.isDeleteIconShow = false;
            this.currentFileName = [];
            return;
        }
        this.isDeleteIconShow = true;
        this.currentFileName = this.histFileArr;
    }
}
</script>
<style scoped>
a {
    color: #42b983;
}
</style>