import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import NavBar from '../components/navbar/NavBar';

const Home = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const signIn = async () => {
			try {
			} catch (error) {}
		};
		signIn();
	}, []);
	return (
		<>
			<NavBar register={true} logIn={true}></NavBar>
			<Typography variant={'h1'}>Friday CRUD App</Typography>
		</>
	);
};

export default Home;
