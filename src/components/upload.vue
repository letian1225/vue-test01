<template>
  <div class="upload">
	<label>
		<span>选择文件</span>
    	<input type="file" @change="doUpload"/>
	</label>
    <div class="show-thumb" v-if="value != ''">
    	<img :src="value" >
    </div>
  </div>
</template>

<script>
import OSS from 'ali-oss'
export default {
  name: 'upload',
  data () {
    return {
		percentage: 0,
        url:'',
        imgsrc:'',
    }
  },
  props:['value'],
  methods:{
  	doUpload($event) {
  	  	const _this = this
  	    const client = new OSS.Wrapper({
  	      	region: 'oss-cn-shanghai',
  	      	accessKeyId: 'LTAIhl3lmWIkjx1L',
  	      	accessKeySecret: 'RXc7tDGgwhBatUMGws80ZwBo7JJJxS',
  	      	bucket: 'lzread'
  	    });
  	    _this.percentage = 0;
  	    const files = $event.target
  	    if (files.files){
  	      	const fileLen = $event.target.files
  	      	let resultUpload = ''
  	      	for (let i = 0; i < fileLen.length; i++) {
  	        	const file = fileLen[i]
  	        	// 随机命名
  	        	let random_name = this.random_string(6) + '_' + new Date().getTime() + '.' + file.name.split('.').pop()
  	        	// 上传
	  	        client.multipartUpload(random_name, file, {
	  	          progress: function* (percentage, cpt) {
	  	            _this.percentage = percentage
	  	          }
	  	        }).then((results) => {
	  	          // 上传完成
	  	          const url = 'http://lzread.oss-cn-shanghai.aliyuncs.com/'+ results.name;
	  	          _this.imgsrc = url;
	  	          _this.$emit('url',url);
	  	        }).catch((err) => {
	  	          console.log(err)
	  	        })
  	      	}
  	    }
  	},
  	// 随机生成文件名
  	random_string(len) {
  	  　　len = len || 32;
  	  　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
  	  　　var maxPos = chars.length;
  	  　　var pwd = '';
  	  　　for (let i = 0; i < len; i++) {
  	    　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  	  }
  	  return pwd;
  	},
  },
  components:{}
}
</script>

<style scoped lang="less">
	.upload{
		label{
			span{width: 90px; height: 30px; line-height: 30px; text-align: center; display: inline-block; cursor: pointer; border-radius: 3px; background-color: #409eff; color: #fff;}
		}
		input[type='file']{width: 1px; height: 1px; position: absolute; left: -9999; top:-9999;
			&:focus{ outline: 0;}
		}
		.show-thumb{width: 100%; margin-top: 10px;
			img{width: 100px; height: 100px; object-fit: cover; border-radius: 4px;}
		}
	}
</style>
