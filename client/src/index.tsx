import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { customTheme } from './config/MuiTheme';
import './index.css';
import { store } from './redux/store';

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider theme={customTheme}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
);
