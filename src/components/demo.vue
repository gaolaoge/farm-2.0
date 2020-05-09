<template>
  <div class="demo">
    <form id="filesDom">
      <label for="files">上传文件夹</label>
      <input type="file" id="files" name="folder" multiple webkitdirectory>
    </form>

    <form id="fileDom">
      <label for="file">上传文件</label>
      <input type="file" id="file" name="file" accept=".ma,.mb">
    </form>

    <el-button @click="handleChange">发送</el-button>

    <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=183412808&site=qq&menu=yes">
      <img border="0" src="http://wpa.qq.com/pa?p=2:183412808:52" alt="点击这里给我发消息" title="点击这里给我发消息"/>
    </a>
  </div>
</template>

<script>
  // import {
  //   upTopGC
  // } from '@/api/api'
  export default {
    name: 'demo',
    data(){
      return {

      }
    },
    methods: {
      handleChange(value) {
        let CJData = new FormData(document.getElementById('fileDom'))
        // CJData.append('file', this.filelist[index]['sceneFile'])          //场景文件
        CJData.append('taskUuid', '123456')      //任务ID
        CJData.append('localPaths', 'E:\\demo')     //用户手写路径 以盘符开头 结尾没有/ 例如 E:\Folder

        let GCData = new FormData(document.getElementById('filesDom')) //工程文件
        GCData.append('taskUuid', '123456')      //任务ID
        GCData.append('localPaths',  'E:\\demo')     //用户手写路径 以盘符开头 结尾没有/ 例如 E:\Folder


        let xml = new XMLHttpRequest()
        xml.open('POST','http://192.168.1.86:5000/professional/file/uploadSceneFile')
        xml.send(CJData)

        let xml2 = new XMLHttpRequest()
        xml2.open('POST','http://192.168.1.86:5000/professional/file/uploadResource')
        xml2.send(GCData)
      }
    }
  }
</script>

<style scoped lang="less">
  .demo {
    padding: 20px;
    background-color: #9e9797;
    form {
      margin: 10px;
      label {
        font-size: 14px;
        width: 100px;
        display: inline-block;
      }
    }
  }
</style>
