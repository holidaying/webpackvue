<template>
    <div class="container limit-width">
        <header>
            <div class="logo">

            </div>
            <div class="user">
                <img src="~static/assets/logo/avatar.jpg" alt="">
            </div>
            <!-- <i class="logo"></i> -->
        </header>
        <div class="page-wrap">
            <a-meuns class="a-meuns"></a-meuns>
            <router-view class="a-content"></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: "",
    props: [""],
    data() {
        return {};
    },

    components: {
        aMeuns: () =>
            import(/* webpackChunkName:"menus" */ "bizComponents/menus")
    },

    computed: {},

    beforeMount() {},

    mounted() {
        this.$router.push({ name: "page_a" });
    },

    methods: {
        goComponets(type) {
            this.$router.push(type);
        }
    },

    watch: {}
};
</script>
<style lang='less'>
@import url("~style/variable.less");
html,
body {
    position: relative;
    margin: 0px auto;
    color: #2d4054;
    font-family: "Avenir,Helvetica,Arial,sans-serif";
    height: 100%;
    background: #000;
}
.container {
    position: relative;
    margin: 0px auto;
    height: 100%;

    overflow: hidden;
    .limit-width {
        width: 1200px;
    }
    header {
        height: 80px;
        text-align: center;
        background: @headerBg;
    }
    .logo {
        display: inline-block;
        width: 200px;
        height: 80px;
        background: url(~src/assets/svg/logo.svg);
        background-size: cover;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    .user {
        position: absolute;
        right: 170px;
        line-height: 80px;
        top: 0px;
        img {
            display: inline-block;
            width: 45px;
            height: 45px;
            border-radius: 45px;
            vertical-align: middle;
            overflow: hidden;
        }
    }
    .page-wrap {
        height: calc(~"100% - 80px");
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: space-between;
        background: @bgColor;
        overflow: hidden;
        .a-meuns {
            width: 250px;
        }
        .a-content {
            margin-left: 30px;
            margin-top: 20px;
            flex-grow: 1;
        }
    }
}
</style>