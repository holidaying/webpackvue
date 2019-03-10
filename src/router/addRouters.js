var router = [
    { name:"page_a",path: '/', component: () => import(/* webpackChunkName: "page_a" */ `modules/pageA/index.vue`) },
]
module.exports=router;