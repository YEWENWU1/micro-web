import './public-path';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import routes from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI);

let router = null;
let instance = null;

function render(props = {}) {
	document.title = 'vue2';
	const { container } = props;
	router = new VueRouter({
		base: window.__POWERED_BY_QIANKUN__ ? '/vue' : '/',
		mode: 'history',
		routes,
	});

	instance = new Vue({
		router,
		store,
		render: (h) => h(App),
	}).$mount(container ? container.querySelector('#app') : '#app');
}

// 不在微前端环境下直接执行render函数
if (!window.__IS_MICRO_WEB_ENV__) {
	render();
}

function storeTest(props) {
	props.onGlobalStateChange &&
		props.onGlobalStateChange(
			(value, prev) =>
				console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
			true
		);
	props.setGlobalState &&
		props.setGlobalState({
			ignore: props.name,
			user: {
				name: props.name,
			},
		});
}

// 第一次加载子应用
export async function bootstrap() {
	console.log('vue2 bootstraped');
}

// 子应用完成加载
export async function mount(props) {
	console.log('[vue] props from main framework，vue2 mount', props);
	storeTest(props);
	render(props);
}

export async function unmount() {
	console.log('vue2 unmount');
	// instance.$destroy();
	// instance.$el.innerHTML = '';
	// instance = null;
	// router = null;
}
