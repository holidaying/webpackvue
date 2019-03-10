export default (Vue) => {
    /**
     * [按钮权限]
     * @param  {[type]} el      [DOM]
     * @param  {[type]} btnName [按钮名称]
     * @param  {[type]} layout  [显示方式 inline、inline-block、block]
     * @return {[type]}         [description]
     */
    const getBtnsPermission = function(el, btnName, layout) {
        var result = false;
        result =btnName=='false'?false:true;
        el.style.display = result ? (layout = layout || "inline-block") : "none";
    };
    Vue.directive("btnPer", {
        // 当绑定元素插入到 DOM 中。
        bind: function(el, binding) {
            var btnName = binding.value || binding.expression,
                layout = binding.arg;
            getBtnsPermission(el, btnName, layout);
        },
        //当绑定元素的指令值更新时,重新赋值
        update: function(el, binding) {
            var btnName = binding.value || binding.expression,
                layout = binding.arg;
            getBtnsPermission(el, btnName, layout);
        }
    });
    /**
     * 图片放大镜
     * v-imagezoom="showImageZoom"//false true
     */
    Vue.directive("imagezoom", {
        bind(el, binding) {
            let $el = $(el);
            $el[binding.value ? "imagezoom" : "closezoom"]();
        },
        update(el, binding) {
            let $el = $(el);
            $el[binding.value ? "imagezoom" : "closezoom"]();
        }
    });
    /**
     * img标签显示默认图片
     */
    Vue.directive("defaultImg", {
        bind(el, binding) {
            el.onerror = function() {
                el.src = binding.value;
            };
        }
    });
};