import 'antd/dist/antd.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import './public-path';

export async function bootstrap() {
	console.log('react15 bootstraped');
}

export async function mount(props = {}) {
	console.log('react15 mount');
	const { container } = props;
	ReactDOM.render(
		<App />,
		container
			? container.querySelector('#react15Root')
			: document.getElementById('react15Root')
	);
	import('./dynamic.css').then(() => {
		console.log('[react15] dynamic style load');
	});

	const styleElement = document.createElement('style');
	styleElement.innerText = '.react15-icon { height: 400px }';
	document.head.appendChild(styleElement);

	// setTimeout(() => {
	//   document.head.removeChild(styleElement);
	// }, 2000);
}

export async function unmount(props) {
	console.log('react15 unmount');
	const { container } = props;
	ReactDOM.unmountComponentAtNode(
		container
			? container.querySelector('#react15Root')
			: document.getElementById('react15Root')
	);
}

if (!window.__IS_MICRO_WEB_ENV__) {
	bootstrap().then(mount);
}
