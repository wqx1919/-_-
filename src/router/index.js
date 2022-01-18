import VueRouter from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import Comment from '../components/Comment'
import Details from '../components/Details'
import Topic from '../components/Topic'
import Animation from '../components/Animation'
// import Animation_copy from '../components/Animation copy'
import HelloWorld from '../components/HelloWorld'
const router = new VueRouter({
	mode:'history',
	routes: [
		{
			path:'/',
			component:Home
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
           path:'/comment',
		   component:Comment
		},
		{
           path:"/details",
		   component:Details
		},
		{
           path:"/topic",
		   component:Topic
		},
		{
			path: '/HelloWorld',
			component: HelloWorld
		},
		{
			path: '/animation',
			component: Animation
		},
		// {
		// 	path: '/Animation_copy',
		// 	component: Animation_copy
		// }
	]
})

//暴露router
export default router