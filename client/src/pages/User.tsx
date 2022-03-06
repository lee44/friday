import { Container, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import UserProfile from '../components/form/UserProfile';
import NavBar from '../components/navbar/NavBar';
import { axios_config } from '../config/axios';
import { ENDPOINTS } from '../config/Endpoints';
import useAxios from '../hooks/useAxios';

type UserProps = {
	id: number;
	name: string;
	email: string;
	role: string;
};

const User = () => {
	const [user, setUser] = useState<UserProps>();
	const custom_axios = useAxios();
	const theme = useTheme();
	let params = useParams();

	useEffect(() => {
		const fetchUser = async () => {
			const response = await custom_axios(ENDPOINTS.FETCHUSER + `/${params.id}`, axios_config);
			setUser(response.data);
		};
		fetchUser();
	}, []);

	return (
		<>
			<NavBar title={'User Dashboard'}></NavBar>

			<Container
				maxWidth={'xs'}
				sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)` }}
			>
				<UserProfile {...user} />
			</Container>
		</>
	);
};

export default User;