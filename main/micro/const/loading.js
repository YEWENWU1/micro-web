let loading = false;

export const setLoading = (loadingStatus) => {
	loading = loadingStatus;
};

export const getLoading = () => {
	return loading;
};
