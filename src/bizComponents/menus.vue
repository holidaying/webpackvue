<template>
    <div class="menus">
        <li v-for="(item,index) in menusList" :class="{'active':index==currentIndex}">
            <i :class="item.icon" class="icon-nav"></i>{{item.name}}
        </li>
        <div class="history-container">
            <p>History</p>
            <li v-for="item in historyList">
                {{item.name|nameFormat}}
            </li>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    props: [""],
    data() {
        return {
            currentIndex: 1,
            menusList: [
                {
                    icon: "icon-dashboard",
                    name: "1"
                },
                {
                    icon: "icon-sitemap",
                    name: "2"
                },
                {
                    icon: "icon-boat",
                    name: "3"
                },
                {
                    icon: "icon-life-bouy",
                    name: "4"
                }
            ],
            historyList: []
        };
    },
    filters:{
        nameFormat:function(value){
            if(value){
                return `${value.split(".")[0]}/Acceptance_test`
            }
        }
    },
    created() {
        $http({
            url: "/api/agents",
            type: "get"
        }).then(res => {
            this.historyList = res.filter(item=>item.status==="building");
        });
    },

    mounted() {},

    methods: {},

    watch: {}
};
</script>
<style lang='less' scoped>
@import "~style/variable.less";
.menus {
    position: relative;
    padding-top: 20px;
    background: @menusBg;
    height: 100%;
    li {
        cursor: pointer;
        line-height: 45px;
        height: 45px;
        padding-left: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgba(255, 255, 255, 0.7);
        &:hover,
        &.active {
            background: @highblack;
            color: @highlevel;
        }
    }
    .icon-nav {
        margin-right: 10px;
    }
    .history-container{
        left:0px;
        position: absolute;
        bottom: 30px;
        right: 0px;
        padding-left: 10px;
         overflow: hidden;
         p{
             font-size: 24px;
             color:#ccc;
             margin-bottom: 10px;
         }
         li{
             list-style:disc;
             font-size: 12px;
             color:#999;
             height: 20px;
             line-height: 20px;
             padding: 0px;
             &:hover{color:#00b4cf};
         }
    }
}
</style>