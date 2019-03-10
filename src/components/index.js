
import Vue from "vue";
import notify from "./notify"
import dialog from "./dialog"
//对外暴露注册函数
module.exports.install = (vue) => {
	Vue.prototype.$notify = notify;
	Vue.prototype.$dialog = dialog;
	window.notify=window.$notify=notify;
	// window.notify=window.$notify=dialog;
};
