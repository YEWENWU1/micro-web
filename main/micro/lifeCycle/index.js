import getAppByRouter from '../utils/getAppByRouter';

// 处理子应用切换时的生命周期函数
export const lifeCycle = () => {
	// 获取上一个子应用，先将上一个子应用卸载
	const preApp = getAppByRouter(window.__ORIGINAL_APP__);
	// 获取要跳转到的子应用
	const nextApp = getAppByRouter(window.__CURRENT_APP__);
	console.log('上一个子应用：', preApp, '下一个子应用：', nextApp);

	// 没有下一个子应用暂时不处理
	if (!nextApp) {
		return;
	}
};
