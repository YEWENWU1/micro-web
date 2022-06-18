import turnApp from '../utils/turnApp';
// 重写路由跳转
export const rewriteRouter = () => {
	window.history.pushState = patchRouter(
		window.history.pushState,
		'micro_push'
	);
	window.history.replaceState = patchRouter(
		window.history.replaceState,
		'micro_replace'
	);
	window.addEventListener('micro_push', turnApp);
	window.addEventListener('micro_replace', turnApp);

	// 处理点击浏览器返回按钮时，也能监听到路由的切换
	window.onpopstate = function () {
		turnApp();
	};
};

// 给当前的路由跳转打补丁
function patchRouter(fun, eventName) {
	return function () {
		const e = new Event(eventName);
		// 不要用箭头函数，否则这里this指向就不是history对象，而是undefined
		fun.apply(this, arguments);
		window.dispatchEvent(e);
	};
}
