/*
	全局插件
	使用方式 this.CID
*/
export default {
	install(Vue, options) {
		//公司ID
		Vue.prototype.CID = () => {
			return '0';
		};
		//登录用户ID
		Vue.prototype.UID = () => {
			return '0';
		};
		//token
		Vue.prototype.TOKEN = () => {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
				return v.toString(16)
			})
		};
		//生成唯一KEY
		Vue.prototype.KEY = "key_" + new Date().getTime();

		//接口url前缀
		Vue.prototype.URL = "http://milibangong.cn/Appservice/";
	}
}
