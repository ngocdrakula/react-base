import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const appRoot = (
	<Provider store={store}>
		<StrictMode>
			<App />
		</StrictMode>
	</Provider>
)

ReactDOM.render(appRoot, document.getElementById('root'));
