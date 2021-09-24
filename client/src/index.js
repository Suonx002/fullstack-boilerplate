import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux';

import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import 'focus-visible/dist/focus-visible';

// fonts
import '@fontsource/raleway/400.css';
import '@fontsource/raleway/600.css';
import '@fontsource/raleway/700.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import customTheme from './styles/theme';

import { store, persistor } from './redux/store';
import SkeletonLoading from './components/loading/SkeletonLoading';
import setAuthToken from './utils/setAuthToken';

if (process.env.NODE_ENV === 'production') {
	axios.defaults.baseURL = process.env.REACT_APP_PROD_BASE_URL;
} else {
	axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
}

if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken);
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={SkeletonLoading} persistor={persistor}>
				<ChakraProvider theme={customTheme}>
					<CSSReset />
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ChakraProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
