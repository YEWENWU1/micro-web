import { getList } from '../const/subApps';

// 查找与传入由相匹配的子应用
function getAppByRouter(path) {
	const appList = getList();
	// const path = window.location.pathname;
	const currentAppConfig = appList.filter((item) => item.activeRule === path);
	if (Array.isArray(currentAppConfig) && currentAppConfig.length > 0) {
		return currentAppConfig[0];
	} else {
		console.log('当前路由和子应用都不匹配');
	}
}

export default getAppByRouter;
