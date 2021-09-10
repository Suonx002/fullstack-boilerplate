import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import './index.css';

import 'focus-visible/dist/focus-visible';

import App from './App';
import reportWebVitals from './reportWebVitals';
import customTheme from './styles/customTheme';

import store from './redux/store';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<ChakraProvider theme={customTheme}>
				<CSSReset />
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ChakraProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
