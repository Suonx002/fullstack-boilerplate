import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import './index.css';

import 'focus-visible/dist/focus-visible';

import App from './App';
import reportWebVitals from './reportWebVitals';
import customTheme from './styles/customTheme';

ReactDOM.render(
	<React.StrictMode>
		<ChakraProvider theme={customTheme}>
			<CSSReset />
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ChakraProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
