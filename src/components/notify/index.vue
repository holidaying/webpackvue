<template>
  <div :class="type" class="notify-container" v-if="show">
    <span>{{message}}</span>
  </div>
</template>
<script>
let setTime=null;
function setTimeoutFn(){
    setTime = setTimeout(()=>{
        this.show=false;
        this.destroyedInstance();
    },3000)
};
  export default {
    name:'',
    data () {
      return {
          show:true
      };
    },

    components: {},
    beforeDestroy() {
        setTime && clearTimeout(setTime);
    },
    mounted() {
        setTimeoutFn.call(this);
    },
    methods: {
        showMessage(message,type){
            setTime && clearTimeout(setTime);
            this.message=message;
            this.type=type;
            setTimeoutFn.call(this);

            
        }
    },
    watch: {

    }
  }

</script>
<style lang='less' scoped>

.notify-container{
    position: absolute;;
    top:0px;
    left: 0px;
    right: 0px;
    text-align: center;
    span{
        padding: 4px 10px;
        color:#fff;
        background: yellow
    }
    &.warning span{
        background: yellow;
    }
    &.success span{
        background: green;
    }
    &.error span{
        background: red;
        color:#fff;
    }
}
</style>