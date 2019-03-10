<template>
    <div class="bar-container">
        <div class="item-building">
            <i class="icon-cog fs144 con-animation common-icon"></i>
            <p class="title">{{building.title}}</p>
            <p class="value">{{building.value}}</p>
        </div>
        <div class="item-idle">
            <i class="icon-coffee fs144 common-icon"></i>
            <p class="title">{{idle.title}}</p>
            <p class="value">{{idle.value}}</p>
        </div>
        <div class="item-statics">
            <li v-for="item in statics">
                <p>{{item.title}}</p>
                <p class="sub-value">{{item.value}}</p>
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
            statics: [
                {
                    title: "ALL",
                    value: 8
                },
                {
                    title: "PHYSICAL",
                    value: 4
                },
                {
                    title: "VIRTUAL",
                    value: 4
                }
            ],
            building: {
                title: "Building",
                value: 3
            },
            idle: {
                title: "idle",
                value: 5
            }
        };
    },
    mounted() {},

    methods: {},

    watch: {}
};
</script>
<style lang='less'>
.bar-container {
    height: 145px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & > div {
        position: relative;
        flex-grow: 0;
        text-align: center;
    }
    .item-building {
        background: #ff9a2a;
    }
    .common-icon{
        opacity: 0.2;
    }
    .con-animation{
        display: inline-block;
        animation:myrotate 4s linear infinite;
    }
    .item-idle {
        background: #7fbc39;
    }
    .item-statics {
        padding: 20px 0px;
        background: #fff;
        display:flex;
        flex-direction: row;
        li{
            text-align: center;
            flex-grow: 1;
        }
        .sub-value{
            line-height: 100px;
            font-size: 30px;
        }
    }
    .title {
        position: absolute;
        left: 10px;
        top: 10px;
        color: #fff;
        font-weight: bolder;
    }
    .value {
        position: absolute;
        right: 20px;
        bottom: 20px;
        color: #fff;
        font-size: 50px
    }
}
</style>