import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

function render(props) {
	const { container } = props;
	ReactDOM.render(
		<App />,
		container
			? container.querySelector('#root')
			: document.querySelector('#root')
	);
}

function storeTest(props) {
	props.onGlobalStateChange(
		(value, prev) =>
			console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
		true
	);
	props.setGlobalState({
		ignore: props.name,
		user: {
			name: props.name,
		},
	});
}

if (!window.__IS_MICRO_WEB_ENV__) {
	render({});
}

export async function bootstrap() {
	console.log('react16 bootstraped');
}

export async function mount(props) {
	console.log('react16 mount');
	storeTest(props);
	render(props);
}

export async function unmount(props) {
	console.log('react16 unmount');
	const { container } = props;
	ReactDOM.unmountComponentAtNode(
		container
			? container.querySelector('#root')
			: document.querySelector('#root')
	);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
