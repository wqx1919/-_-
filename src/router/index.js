import VueRouter from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import Comment from '../components/Comment'
import Details from '../components/Details'
import Topic from '../components/Topic'
import Animation from '../components/Animation'
import TopicList from '../components/TopicList'
import User from '../components/User'
import Update from '../components/part/Update'
import Allcategory from '../components/Allcategory'
import Admin from '../components/Admin'
import AdminBen from '../components/AdminBen'
import AdmineMessage from '../components/AdmineMessage'

// import Animation_copy from '../components/Animation copy'
const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: Home
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/comment',
			component: Comment
		},
		{
			//    path:"/details",
			path: "/details/:id/:topic_user_id/:topic_category_id/:title/:content",
			component: Details,
			name: "details"

		},
		{
			name: 'Topic',
			path: "/topic",
			component: Topic
		},
		{
			path: '/animation',
			component: Animation
		},
		{
			path: '/TopicList',
			component: TopicList
		},
		{
			path: '/User',
			component: User
		},
		{
			path: '/Update',
			component: Update
		},
		{
			path: '/Allcategory',
			component: Allcategory
		},
		{
			path: '/Admin',
			component: Admin,
			children: [ //通过children配置子级路由
				{
					path: 'AdminBen', //此处一定不要写：/AdminBen
					component: AdminBen
				},
				{
					path: 'AdmineMessage',//此处一定不要写：/message
					component: AdmineMessage
				}
			]
		},

		// {
		// 	path: '/Animation_copy',
		// 	component: Animation_copy
		// }
	]
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
// router.beforeResolve((to, from, next) => {
// 	console.log(to, from)
// 	next()
//   })
//路由加载之前钩子
router.beforeEach((to, from, next) => {
	//如果是首页，就加载动画，把对应参数赋值
	if (to.path === '/') {
		// let Animationshow = localStorage.getItem('Authorization');
		localStorage.setItem('Animation', true)
		//    this.$bus.$emit('getshow',true)
	} else {
		// if(to.path === '/'){
		// let Animationshow = localStorage.getItem('Authorization');
		localStorage.removeItem('Animation');
		//    this.$bus.$emit('getshow',true)
		// }
	}
	if (to.path === '/login' || to.path === '/register' || to.path === '/' ) {//登录或注册 
		next();
	} else {
		let token = localStorage.getItem('Authorization');

		if (token === null || token === '') {
			next('/login');
			// next('/Register')
		} else {
			next();
		}
	}
});
//暴露router
export default router