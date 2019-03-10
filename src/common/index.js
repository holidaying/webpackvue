import directive from "./directive";
import filter from "./filter"
var common = {
    install:(Vue)=>{
        directive(Vue);
        filter(Vue);
    }
}
if (typeof exports == "object") {
	module.exports = common;
} else if (typeof define == "function" && define.amd) {
	define([], function() {
		return common;
	});
} else if (window.Vue) {
	Vue.use(common);
}