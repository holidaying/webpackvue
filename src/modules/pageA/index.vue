<template>
    <a-content></a-content>
</template>

<script>
export default {
    name: "",
    props: [""],
    data() {
        return {};
    },

    components: {
        aContent:()=>import(/* webpackChunkName: "content" */ "./content")
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}
};
</script>
<style lang='less' scoped>

</style>