const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
	},
	{
		path: '/index',
		name: 'Index',
		component: () => import(/* webpackChunkName: "home" */ '@/views/Home'),
	},
	{
		path: '/about',
		name: 'About',
		component: () => import(/* webpackChunkName: "about" */ '@/views/About'),
	},
];

export default routes;
