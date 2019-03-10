<template>
    <div class="dialog-container" v-show="show" :class="{'class-modal':classModal}" @click="closeDialog" ref="dialog">
        <div class="main-container" @click.stop="">
            <p>Seperate mulitiplay resource name width commons</p>
            <i class="icon-close icon-dialog-close" @click="closeDialog"></i>
            <input type="text" v-model="writeKeys" placeholder="e.g. Chrome,Firfox">
            <div class="tool-bars">
                <span class="addResouce-btn buttonsuccess mr10" @click="summit">addResouce</span>
                <span class="cancel-btn buttoncancel" @click="closeDialog">cancel</span>
            </div>
        </div>
    </div>
</template>
<script>
import bus from "src/service/bus";
const OS = ["Firefox", "Safari", "Ubuntu", "Chrome"];
export default {
    name: "",
    data() {
        return {
            writeKeys: "",
            show: true,
            classModal: true
        };
    },

    components: {},
    beforeDestroy() {},
    mounted() {
        this.showDialog(this.element, this.modal);
    },
    methods: {
        showDialog(element, modal) {
            this.writeKeys = "";
            if (element) {
                this.$refs.dialog.style.position = `absolute`;
                this.$refs.dialog.style.top = `${element.pageY + 40}px`;
                this.$refs.dialog.style.left = `${element.pageX - 65}px`;
                this.classModal = false;
            } else {
                this.classModal = true;
            }
            this.show = true;
        },
        closeDialog() {
            this.writeKeys = "";
            this.show = false;
        },
        summit() {
            var list = this.writeKeys.split(","),status=true;
            
            list.forEach(item=>{
                if(OS.indexOf(item)==-1){
                    notify(`${item}无效`,"error");
                    status=false;
                    return
                }
            })
            if(!status){return}
            bus.$emit("addResource", list);
            this.show = false;
        }
    }
};
</script>
<style lang='less' scoped>
.dialog-container {
    position: fixed;
    z-index: 9999;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .main-container {
        position: relative;
        width: 500px;
        height: 120px;
        border: 2px solid #00b4cf;
        position: relative;
        background-color: #fff;
        z-index: 10000;
        padding: 20px 10px;
        display: inline-block;
        .icon-dialog-close {
            position: absolute;
            right: 20px;
            top: 10px;
            color:#00b4cf;
            font-size: 20px;
            cursor: pointer;
            font-weight: bolder;
            &:hover{
                color:#01869a;
            }
        }
        input {
            margin-top: 20px;
            -webkit-appearance: none;
            width: 100%;
            height: 36px;
            line-height: 36px;
            border-radius: 4px;
            text-indent: 5px;
            font-size: 16px;
            border: 1px solid rgb(221, 221, 221);
            box-shadow: 2px 2px 2px #ddd inset;
            color: #00b4cf;
        }
        &:before,
        &:after {
            content: "";
            display: block;
            border-width: 20px;
            position: absolute;
            top: -40px;
            left: 40px;
            border-style: solid;
            border-color: transparent transparent #00b4cf;
            font-size: 0;
            line-height: 0;
        }
        &:after {
            top: -38px;
            border-color: transparent transparent #fff;
        }
        .tool-bars {
            color: #fff;
            margin-top: 26px;
            span {
                cursor: pointer;
                padding: 4px 10px;
            }
        }
    }
}
.class-modal {
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
}
.class-modal::before {
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(0, 0, 0, 0.5);
}
</style>