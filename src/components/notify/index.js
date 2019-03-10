import Vue from "vue";
import notify from "./index.vue";
const notifyConstructor = Vue.extend(notify);
let instance=null;

const notity = ((message,type) => {
    if (Vue.prototype.$isServer) return;
    message=message||"";
    type = type||"warning";
    if(instance){
        instance.showMessage(message,type);
    }else{
        instance = new notifyConstructor({
            el: document.createElement("div"),
            data: {
                type:type,
                message:message,
                destroyedInstance:()=>{
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