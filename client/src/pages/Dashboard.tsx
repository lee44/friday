import { Container, Grid, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar/NavBar';
import UserProfile from '../components/userprofile/UserProfile';
import { axios_config } from '../config/axios';
import { ENDPOINTS } from '../config/Endpoints';
import useAxios from '../hooks/useAxios';
import { useAppSelector } from '../redux/hooks';

export type UserProps = {
	id: number;
	name: string;
	email: string;
	role: string;
}[];

const Dashboard = () => {
	const [users, setUser] = useState<UserProps>();
	const userSelector = useAppSelector((state) => state.user);
	const theme = useTheme();
	const navigate = useNavigate();
	const custom_axios = useAxios();

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				let response;
				if (userSelector.user.role === 'Admin') {
					response = await custom_axios(ENDPOINTS.FETCH_USERS, axios_config);
				} else {
					response = await custom_axios(ENDPOINTS.FETCH_USER, axios_config);
				}
				setUser(response.data);
			} catch (error) {
				navigate('/unauthorized');
			}
		};
		fetchUsers();
	}, []);
	return (
		<>
			<NavBar title={'Admin Dashboard'} logOut={true}></NavBar>
			<Container
				fixed
				sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)` }}
			>
				<Grid container spacing={2}>
					{users?.map((user, index) => {
						return (
							<Grid item xs={12} md={6} lg={6} xl={4} key={index}>
								<UserProfile {...user} setUser={setUser} />
							</Grid>
						);
					})}
				</Grid>
			</Container>
		</>
	);
};

export default Dashboard;
