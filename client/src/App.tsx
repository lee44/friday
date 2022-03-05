import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';

function App() {
	return (
		<div className='App'>
			<Routes>
				{/* Public Routes */}
				<Route path='/' element={<Home />} />
				<Route path='login' element={<Login />} />
				<Route path='register' element={<Register />} />
				<Route path='unauthorized' element={<Unauthorized />} />

				{/* Private Route */}
				<Route path='dashboard' element={<Dashboard />} />
			</Routes>
		</div>
	);
}

export default App;
