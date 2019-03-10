<template>
    <div>
        <topBar></topBar>
        <div class="main-container">
            <div class="tab-container">
                <li v-for="(item,index) in conditions" :class="{'active':index==currentIndex}">
                    {{item.title}}
                </li>
                <div class="layout-btn fs20">
                    <i class="icon-th-card mr10"></i>
                    <i class="icon-th-list active"></i>
                </div>
            </div>
            <div class="result">
                <li v-for="item in resultList" class="list-item">
                    <div class="sys sysmaker">
                        <img :src="item.os|iconMatch" alt="">
                    </div>
                    <div class="sys sysinfo">
                        <p><i class="icon-desktop mr10"></i><span class="highblackcolor">{{item.name}}</span><span class="info-status fs14 ml10" :class='item.status|colorMatch'>{{item.status}}</span></p>
                        <div class="tool-bars">
                            <span class="plus-btn" @click="openDialog($event,item)"><i class="icon-plus fs18"></i></span>
                            <span class="sys-label mr10 fs14" v-for="(sitem,index) in item.resources">
                                {{sitem}}
                                <i class="icon-trash ml10" @click="updateItem(item,index)"></i>
                            </span>
                        </div>
                    </div>
                    <div class="sys sysip">
                        <p><span class="mr20"><i class="icon-info fs16"></i>{{item.ip}}</span><span><i class="icon-folder fs16"></i>{{item.location}}</span></p>
                        <div class="deny-right">
                            <i class="icon-deny fs14"></i>
                            Deny
                        </div>
                    </div>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
const ICONSMAP = {
    windows: require("static/assets/os/windows.png"),
    ubuntu: require("static/assets/os/ubuntu.png"),
    debian: require("static/assets/os/debin.png"),
    suse: require("static/assets/os/suse.png"),
    centos: require("static/assets/os/cent_os.png")
};
import bus from "src/service/bus";
export default {
    name: "",
    props: [""],
    data() {
        return {
            currentIndex: 0,
            currentItem: null,
            conditions: [
                {
                    title: "All",
                    linkTo: ""
                },
                {
                    title: "Physical",
                    linkTo: ""
                },
                {
                    title: "Virtual",
                    linkTo: ""
                }
            ],
            resultList: []
        };
    },

    components: {
        topBar: () =>
            import(/* webpackChunkName: "topBar" */ "./componets/topBar")
    },
    filters: {
        iconMatch: function(value) {
            if (value) {
                return ICONSMAP[value];
            }
        },
        colorMatch: function(val) {
            if (val) {
                return val === "idle" ? "idelcolorbg" : "buildingcolorbg";
            }
        }
    },
    computed: {},

    created() {},

    mounted() {
        this.getList();
        bus.$on("addResource", res => {
            this.addItem(res);
        });
    },

    methods: {
        getList() {
            $http({
                url: "/api/agents",
                type: "get"
            }).then(res => {
                this.resultList = res;
            });
        },
        /**
         * 打开窗口
         */
        openDialog(element, item) {
            this.currentItem = item;
            this.$dialog(element, true);
        },
        /**
         * 修改
         */
        updateItem(item, index) {
            item.resources.splice(index, 1);
            $http({
                url: `/api/agents/${item.id}`,
                type: "put",
                data: item
            }).then(res => {
                // this.resultList = res;
            });
        },
        /**
         * 新增
         */
        addItem(item) {
            item.map(el => {
                if (this.currentItem.resources.indexOf(el) == -1)
                    this.currentItem.resources.push(el);
            });
            $http({
                url: `/api/agents/${this.currentItem.id}`,
                type: "put",
                data: this.currentItem
            }).then(res => {
                // this.resultList = res;
            });
        }
    },

    watch: {}
};
</script>
<style lang='less' scoped>
@import url("~style/variable.less");
.main-container {
    // overflow-y: auto;
    height: calc(~"100% - 200px");
}
.tab-container {
    margin: 20px 0px;
    position: relative;
    height: 60px;
    background: #fff;
    li {
        width: 100px;
        line-height: 60px;
        text-align: center;
        display: inline-block;
        border-right: 1px solid #eee;
        cursor: pointer;
        &.active,
        &:hover {
            border-bottom: 3px solid @highlevel;
        }
    }
    .layout-btn {
        position: absolute;
        right: 20px;
        top: 0px;
        bottom: 0px;
        line-height: 60px;
        .active {
            color: @highlevel;
        }
        i {
            cursor: pointer;
        }
    }
}
.result {
    .list-item {
        height: 100px;
        margin-bottom: 20px;
        background: #fff;
        display: flex;
        flex-direction: row;
    }
    .sysmaker {
        line-height: 100px;
        width: 110px;
        text-align: center;
    }
    img {
        display: inline-block;
        vertical-align: middle;
    }
    .sys {
        position: relative;
    }
    .sysinfo,
    .sysip {
        padding: 20px 0px;
        flex-grow: 1;
    }
    .tool-bars {
        position: relative;
        left: 0px;
        margin: 25px 0px;
    }
    .plus-btn {
        display: inline-block;
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        cursor: pointer;
        background: @highlevel;
        &:hover {
            background: @lowlevel;
        }
        color: #fff;
    }
    .info-status {
        color: #fff;
        padding: 2px 4px;
    }
    .sys-label {
        padding: 2px 4px;
        background: @usualbg;
        cursor: pointer;
    }
    .deny-right {
        position: absolute;
        bottom: 10px;
        padding: 4px 10px;
        right: 20px;
        cursor: pointer;
        background: @highlevel;
        &:hover {
            background: @lowlevel;
        }
        color: #fff;
    }
}
</style>