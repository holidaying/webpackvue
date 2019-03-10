import Vue from "vue";
import dialog from "./index.vue";
const dialogConstructor = Vue.extend(dialog);
let instance=null;

const notity = ((element,modal) => {
    if (Vue.prototype.$isServer) return;
    if(instance){
        instance.showDialog(element,modal);
    }else{
        instance = new dialogConstructor({
            el: document.createElement("div"),
            data: {
                element:element,
                modal:modal,
                destroyedInstance:()=>{
                    instance && document.body.removeChild(instance.$el);
                    instance=null;
                },
            }
        }); 
        document.body.appendChild(instance.$el);
        Vue.nextTick(function () {
            instance.show = true;
        });
    }
	return instance;
});

export default notity;