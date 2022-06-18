import getAppByRouter from '../utils/getAppByRouter';
import { getMainLifeCycle } from '../const/mainLifeCycle';
import loadHtml from '../loader/loadHtml';

// 处理子应用切换时的生命周期函数
export const lifeCycle = async () => {
	// 获取上一个子应用，先将上一个子应用卸载
	const preApp = getAppByRouter(window.__ORIGINAL_APP__);
	// 获取要跳转到的子应用
	const nextApp = getAppByRouter(window.__CURRENT_APP__);
	console.log('上一个子应用：', preApp, '下一个子应用：', nextApp);

	// 处理上一个子应用的卸载逻辑
	if (preApp) {
		preApp && typeof preApp.destroy === 'function' && (await preApp.destroy());
		await runMainLifeCycle('afterUnmount', preApp);
	}

	// 没有下一个子应用暂时不处理
	if (nextApp) {
		// 先执行主应用的生命周期
		await runMainLifeCycle('beforeLoad', nextApp);
		// 再执行子应用的生命周期
		// 这里应该是从esm模块中取子应用的生命周期函数，而不是显式传入的
		const nextAppContent = await loadHtml(nextApp);
		nextAppContent &&
			nextAppContent.beforeLoad === 'function' &&
			(await nextAppContent.beforeLoad());

		nextApp && nextApp.mounted === 'function' && (await nextApp.mounted());
		runMainLifeCycle('mounted', nextApp);
	}
};

export const runMainLifeCycle = async (type, preApp) => {
	const mainLifeCycle = getMainLifeCycle();
	if (type && mainLifeCycle[type]) {
		await Promise.all(
			mainLifeCycle[type].map(async (item) => {
				if (typeof item === 'function') {
					item(preApp);
				}
			})
		);
	}
};
