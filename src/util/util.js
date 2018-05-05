/*
	全局插件
	使用方式 this.CID
*/
import { setCookie, getCookie, delCookie } from "@/vendor/cookie.js";
export default {
	install(Vue, options) {
		//代理商ID
		Vue.prototype.AID = () => {
			return getCookie("a_id");;
		};
		//代理商管理员ID
		Vue.prototype.AUID = () => {
			return getCookie("au_id");;
		};
		//当前登录的用户级别
		Vue.prototype.LEVEL = () => {
			return getCookie("a_level");
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
