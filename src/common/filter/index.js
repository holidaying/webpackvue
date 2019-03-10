export default (Vue)=>{
        Vue.filter('sexTrans', function(value) {
            var dicName = "SEX";
            if (value == "-1") { return "未识别" }
            return v;
        });
        //年-月-日 时：分：秒
        Vue.filter('dateTimeFormat', function(value) {
            //to do
            if (value == "" || value == undefined || isNaN(new Date(value)) == true) {
                return "无效时间";
            }
            var data = new Date(parseInt(value));
            var year = data.getFullYear();
            var month = data.getMonth() >= 9 ? (data.getMonth() + 1).toString() : '0' + (data.getMonth() + 1);
            var day = data.getDate() > 9 ? data.getDate().toString() : '0' + data.getDate();
            var hours = data.getHours() > 9 ? data.getHours().toString() : '0' + data.getHours();
            var minutes = data.getMinutes() > 9 ? data.getMinutes().toString() : '0' + data.getMinutes();
            var ss = data.getSeconds() > 9 ? data.getSeconds().toString() : '0' + data.getSeconds();
            value = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + ss;
            return value;
        });
      
        
        Vue.filter('isNull', function(val) {
            if (!!val) return val;
            return "未知";
        });
};