import VueRouter from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import Comment from '../components/Comment'
import Details from '../components/Details'
import Topic from '../components/Topic'
import Animation from '../components/Animation'
import ErrorMessage from '../components/ErrorMessage'
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
        //    path:"/details",
		   path:"/details/:id/:topic_user_id/:topic_category_id/:title/:content",
		   component:Details,
		   name:"details"

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
		{
			path:'/ErrorMessage',
			component:ErrorMessage
		}
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
// ————————————————
// 版权声明：本文为CSDN博主「*唔西迪西*」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/weixin_46041654/article/details/108400919
// router.beforeResolve((to, from, next) => {
// 	console.log(to, from)
// 	next()
//   })
router.beforeEach((to, from, next) => {
	if(to.path === '/'){
		// let Animationshow = localStorage.getItem('Authorization');
		localStorage.setItem('Animation', true)
	//    this.$bus.$emit('getshou',true)
	}else{
		// if(to.path === '/'){
			// let Animationshow = localStorage.getItem('Authorization');
			localStorage.removeItem('Animation');
			//    this.$bus.$emit('getshou',true)
		// }
	}
	if (to.path === '/login' || to.path === '/register' ) {//登录或注册
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