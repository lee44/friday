import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import RequiredAuth from './router/RequiredAuth';

function App() {
	return (
		<div className='App'>
			<Routes>
				{/* Public Routes */}
				<Route path='/' element={<Home />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='unauthorized' element={<Unauthorized />} />
				<Route path='*' element={<NoPage />} />

				{/* Private Route */}
				<Route
					path='dashboard'
					element={
						<RequiredAuth>
							<Dashboard />
						</RequiredAuth>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
