import { getList, setList } from './const/subApps';
import { rewriteRouter } from './router/rewriteRouter';
import { getMainLifeCycle, setMainLifeCycle } from './const/mainLeftCycle';
import getAppByRouter from './utils/getAppByRouter';
// 实现路由拦截
rewriteRouter();

// 注册子应用
export const registerMicroApps = (appList, lifeCycle) => {
	setList(appList);
	// lifeCycle.beforeLoad[0]();
	// setTimeout(() => {
	// 	lifeCycle.mounted[0]();
	// }, 3000);
	setMainLifeCycle(lifeCycle);
};

// 启动微前端框架
export const start = () => {
	const appList = getList();
	// 处理子应用列表不合规
	if (!Array.isArray(appList) || appList.length === 0) {
		console.log('子应用列表为空');
		return;
	}

	const path = window.location.pathname;
	const currentApp = getAppByRouter(path);
	if (currentApp) {
		const { pathname, hash } = window.location;
		const url = pathname + hash;
		// 启动时的pushState需要手动触发
		window.history.pushState('', '', url);
		window.__CURRENT_APP__ = currentApp.activeRule;
	}
};
