var router = [
    { name:"foo",path: '/foo', component: () => import(`../modules/pageA/menus.vue`) },
    { name:"bar",path: '/bar', component: () => import(`../modules/pageA/content.vue`) }
]
module.exports=router;