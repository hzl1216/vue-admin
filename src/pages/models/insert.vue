<template>
  <el-form :model="form" :inline="true" style="width:1000px" :rules="rules"  ref="form">
    <el-form-item label="modelname" prop="modelname">
      <el-input v-model="form.modelname" placeholder="请输入modelname" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="description" prop="description">
      <el-input v-model="form.description" placeholder="请输入description" style="width:300px"></el-input>
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
    
    <div>
      <MultiFileUpload @transferFilePath= 'getFilePath'></MultiFileUpload>
    </div>

    <el-row v-for="(item,index) in form.inputparams" :key="index" >
      <el-form-item label="输入参数名" :prop="'inputparams.' + index + '.name'" >
        <el-input v-model="item.name" placeholder="请输入参数名" style="width:200px"> </el-input>
      </el-form-item>
      <el-form-item label="输入类型" :prop="'inputparams.' + index + '.type'" >
        <select v-model="item.type" >
          <option v-for="type in options" >{{type}}</option>
        </select>
      </el-form-item>
      <el-form-item label="输入缺省值" :prop="'inputparams.' + index + '.default'" >
        <el-input v-model="item.default" placeholder="请输入缺省值" style="width:200px"> </el-input>
      </el-form-item>
      <el-button type="danger" v-if="form.inputparams.length > 1" size="medium" @click="removeRow(index)">删除</el-button>
    </el-row>
    <el-button type="primary" size="medium" @click="addRow">新增输入参数</el-button>

    <el-row v-for="(item,index) in form.outputparams" :key="index+1" >
      <el-form-item label="输出参数名" :prop="'outputparams.' + index + '.name'" >
        <el-input v-model="item.name" placeholder="输出参数名" style="width:200px"> </el-input>
      </el-form-item>
      <el-form-item label="输出类型" :prop="'outputparams.' + index + '.type'" >
        <select v-model="item.type" >
          <option v-for="type in options" >{{type}}</option>
        </select>
      </el-form-item>
      <el-form-item label="输出缺省值" :prop="'outputparams.' + index + '.default'" >
        <el-input v-model="item.default" placeholder="请输入输出缺省值" style="width:200px"> </el-input>
      </el-form-item>
      <el-button type="danger" v-if="form.outputparams.length > 1" size="medium" @click="removeRow2(index)">删除</el-button>
    </el-row>
    <el-button type="primary" size="medium" @click="addRow2">新增输出参数</el-button>

    <el-row>
    <el-form-item>
      <el-button size="small" type="primary" @click="updateHandle('form')">提交模型</el-button>
      <el-button size="small">取消</el-button>
    </el-form-item>
    </el-row>
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
      options: [
        '文件', '数值'
      ],
      types: [
        'R', 'python'
      ],
      limitNum: 100,
      formLabelWidth: '80px',
      fileList: [],
      form: {
          file: '',
          modelname: '',
          description: '',          
          type: 'R',
          inputparams:[
            {
              name:'',
              type:'',
              default:''
            }
          ],
          outputparams:[
            {
              name:'',
              type:'',              
              default:''
            }
          ],

        },
        rules: {
          description: [
            { required: true, message: 'description不能为空', trigger: 'blur' }
          ],
          modelname: [
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
           
        } ,
  methods: {
    selected: function(type) {
      this.type = type
    },

    updateHandle (formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.updatedatabase();
          }
        });
      },
    
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
          type: this.form.type,
          modelname: this.form.modelname,
          modelurl: this.filepath,
          description: this.form.description,
          inputparams: JSON.stringify( this.form.inputparams ),
          outparams: JSON.stringify(this.form.outputparams)
        };
        console.log(data);
        this.instance.insertModels(data,  {'Content-Type': 'application/x-www-form-urlencoded'}).then(res => {
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
    },
    // 添加
    addRow() {
      this.form.inputparams.push({
        name: "",
        type: "",
        default: ""
      });
    },
    removeRow(index) {
      this.form.inputparams.splice(index, 1);
    },
    
    // 添加
    addRow2() {
      this.form.outputparams.push({
        name: "",
        type: "",
        default: ""
      });
    },
    removeRow2(index) {
      this.form.outputparams.splice(index, 1);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>