import { lifeCycle } from '../lifeCycle';

// 每一次路由切换时执行
const turnApp = async () => {
	window.__ORIGINAL_APP__ = window.__CURRENT_APP__;
	// 防止pushState触发多次的情况下，turnApp多次执行
	if (window.location.pathname === window.__CURRENT_APP__) {
		return;
	} else {
		window.__CURRENT_APP__ = window.location.pathname;
		lifeCycle();
	}

	// 微前端的生命周期执行
	console.log('turnApp');
};

export default turnApp;
