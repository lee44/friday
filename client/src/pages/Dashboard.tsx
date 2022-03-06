import { Container, Grid, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar/NavBar';
import UserProfile from '../components/userprofile/UserProfile';
import { axios_config } from '../config/axios';
import { ENDPOINTS } from '../config/Endpoints';
import useAxios from '../hooks/useAxios';

type UserProps = {
	id: number;
	name: string;
	email: string;
	role: string;
}[];

const Dashboard = () => {
	const [user, setUser] = useState<UserProps>();
	const theme = useTheme();
	const navigate = useNavigate();

	const custom_axios = useAxios();

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await custom_axios(ENDPOINTS.FETCH_USERS, axios_config);
				setUser(response.data);
			} catch (error) {
				navigate('/unauthorized');
			}
		};
		fetchUser();
	}, []);
	return (
		<>
			<NavBar title={'Admin Dashboard'} logOut={true}></NavBar>
			<Container
				fixed
				sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)` }}
			>
				<Grid container spacing={2}>
					{user?.map((user, index) => {
						return (
							<Grid item xs={12} md={6} lg={6} xl={4}>
								<UserProfile key={index} {...user} />
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</>
	);
};

export default Dashboard;
