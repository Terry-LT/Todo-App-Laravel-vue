require('./bootstrap');
window.Vue = require('vue').default;

// https://dev.to/lvtdeveloper/laravel-vue-router-tutorial-1965
import VueRouter from "vue-router"

Vue.use(VueRouter);

const routes = [
    { path:"/" ,component: require('./components/Todo.vue').default,name:"app" },
    //https://router.vuejs.org/guide/essentials/passing-props.html
    //
    { path:"/update/:id/" ,component: require('./components/task/TaskUpdate.vue').default,props:true,name:"task.update" },
];

const router = new VueRouter({
    routes:routes,
    mode:"history"
});


const app = new Vue({
    router:router,
    el: '#app',
});