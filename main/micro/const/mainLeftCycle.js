// 主应用各个生命周期需要做的事情
let lifeCycle = {};

export const getMainLifeCycle = () => {
	return lifeCycle;
};

export const setMainLifeCycle = (newLifeCycle) => {
	lifeCycle = newLifeCycle;
};
