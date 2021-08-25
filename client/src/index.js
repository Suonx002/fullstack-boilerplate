import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import theme from './theme/theme';
import Scrollbar from './components/scrollbar/Scrollbar';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ChakraProvider theme={theme}>
				<Scrollbar>
					<App />
				</Scrollbar>
			</ChakraProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
