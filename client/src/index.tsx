import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { customTheme } from './config/MuiTheme';
import './index.css';

ReactDOM.render(
	<ThemeProvider theme={customTheme}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ThemeProvider>,
	document.getElementById('root')
);
