class fileUpload {
    constructor(serviceUrl) {
      this._serviceUrl = serviceUrl;
      // this._bid = BID;
      // this._fieldName = fieldName;
      this._indexArr = [];
      this._file;
      this._name;
      this._size;
      this._shardSize = 2 * 1024 * 1024;
      this._shardCount;
      this._group = 0;
      this._start = 0;
      this._end;
      this._fileSucess = false;
      this.percentage = 0;
      this._groupSize = 50;
      this.successUpload = null;
      this.percentageSend = null;
      this._sendFile = {}; //保存整条数据时传给后台的数据
    }
    //单文件上传
    upLoad(onefile) {
      //初始化数据
      this._group = 0;
      this._start = 0;
      this._end = 0;
      this.percentage = 0; //进度
      this._indexArr = [];
      this._fileSucess = false;
      this._file = onefile;
      this._name = this._file.name; //文件名
      this._size = this._file.size; //总大小
      this._shardSize = 2 * 1024 * 1024; //以2MB为一个分片
      this._shardCount = Math.ceil(this._size / this._shardSize); //总片数
      this._uploadByCel(this._group * this._groupSize);//
    }
    //多分片时，每次只派发50个分片
    _uploadByCel(startIndex) {
   
      //本次循环将发出去的结尾block数；
      let cCount = Math.min(this._shardCount, (this._group + 1) * this._groupSize);//总片数和50比较cCount取小的值
      const nowtime=this.formatTime(new Date())
      for (let i = startIndex; i < cCount; i++) {
        this._start = i * this._shardSize;
        this._end = Math.min(this._size, this._start + this._shardSize);//结束时总大小，和 开始的大小+之前的大小比较
        let form = new FormData();//new一个form的实例，可以进行键值对的添加，
        let request = new XMLHttpRequest()
        //对form进行添加，form.get('data')，可以通过get方法获取到值
        console.log(this._file.lastModified,"this._filethis._filethis._filethis._file")
        form.append("data", this._file.slice(this._start, this._end)); //slice方法用于切出文件的一部分
        form.append("name", this._name);
        form.append("total", this._shardCount); //总片数
        form.append("index", i + 1);
        form.append("nowtime", this._file.lastModified);
        form.get('nowtime')
        form = this.initHttpHeader(form);
   
        // form.append("folderid", this._bid);
        // form.append("fieldname", this._fieldName);
        if (request && form) {
          request.open("POST", this._serviceUrl, true);
          request.onload = (oEvent) => {
            let aaa = JSON.parse(request.response);
            let obj = aaa.data
            if (obj && obj.end) {
              this._fileSucess = true;
              this.percentage = 100;
              //构造保存数据时传给后台的数据
              // if (obj.folderid)
              //   this._sendFile.folderid = obj.folderid;
              // if (obj.foldername)
              //   this._sendFile.foldername = obj.foldername;
              if (obj.name)
                this._sendFile.name = obj.name;
              if (obj.fileid)
                this._sendFile.fileid = obj.fileid;
              if (obj.realname)
                this._sendFile.realname = obj.realname;
              // if (obj.fieldname)
              //   this._sendFile.fieldname = obj.fieldname;
              if (this.percentageSend != null)
                this.percentageSend(this.percentage);
              if (this.successUpload != null)
                this.successUpload(true, this._sendFile,obj);
            } else
              if (this.successUpload != null)
                this.successUpload(false);
            if (obj && obj.index && obj.name != 'null' && obj.state && !obj.end) {
              this._indexArr.push(obj.index);
              this.percentage = Math.floor((this._indexArr.length / this._shardCount) * 100);
              if (this.percentageSend != null)
                this.percentageSend(this.percentage);
              if (cCount != this._shardCount) {
                if (this._indexArr.length == cCount) {
   
                  this._group++;
                  this._uploadByCel(this._group * this._groupSize);
                }
              }
            }
            if (obj && obj.index && !obj.state) {
              if (!this._fileSucess)
                this._reUpload(obj.index);
            }
          };
          request.send(form);
        }
      }
      // return this.percentage;
    }
    initHttpHeader(form) {
      let out_form = form;
   
      //----------TODO------------
      // out_form.append("folderid", this._bid);
      // out_form.append("fieldname", this._fieldName);
      //--------------------------
   
      return out_form;
    }
    //上传出现问题未上传的区片重现上传
    _reUpload(index) {
      this._start = index * this._shardSize;
      this._end = Math.min(this._size, this._start + this._shardSize);
      let form = new FormData();
      let request = new XMLHttpRequest()
      //append在form中元素的尾部添加内容
      form.append("data", this._file.slice(this._start, this._end)); //slice方法用于切出文件的一部分
      form.append("name", this._name);
      form.append("total", data.length); //总片数
      form.append("index", index);
      form = this.initHttpHeader(form);
   
      // form.append("folderid", this._bid);
      // form.append("fieldname", this._fieldName);
      if (request && form) {
        request.open("POST", this._serviceUrl, true);
        request.onload = (oEvent) => {
          let obj = JSON.parse(request.response);
          if (obj && obj.end) {
            this._fileSucess = true;
          }
          if (obj && obj.index && obj.name != 'null' && obj.state) {
            this._indexArr.push(obj.index);
            this.percentage = Math.floor((this._indexArr.length / this._shardCount) * 100);
          }
        };
        request.send(form);
      }
    }
    formatTime(time, type, doubleNum) {
      /**time:需要转换的时间；
       * type：需要格式化的类型y(y)、y-m(m)、y-m-d(d)/y-m-d h:m:s(默认)；
       * doubleNum：月日时分秒的类型，例如2017-6('1') or 2017-06(默认)**/
        let mydate = time ? new Date(time) : new Date();
        let year = mydate.getFullYear();
        let month = mydate.getMonth() + 1;
        let day = mydate.getDate();
        let hour = mydate.getHours();
        let minute = mydate.getMinutes();
        let second = mydate.getSeconds();
        if (!doubleNum) {
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            hour = hour < 10 ? '0' + hour : hour;
            minute = minute < 10 ? '0' + minute : minute;
            second = second < 10 ? '0' + second : second;
        }
        if (type == 'y') {
            return year;
        } else if (type == "m") {
            return year + '-' + month;
        } else if (type == 'd') {
            return year + '-' + month + '-' + day;
        } else {
            return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ":" + second;
        }
    }
  }
  export default fileUpload;