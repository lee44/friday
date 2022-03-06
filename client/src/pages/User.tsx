import { Container, useTheme } from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UserProfile from '../components/form/UserProfile';
import { ENDPOINTS } from '../config/Endpoints';

type UserProps = {
	id: number;
	name: string;
	email: string;
	role: string;
};

const config: AxiosRequestConfig = {
	headers: { 'Content-Type': 'application/json' },
	withCredentials: true,
};

const User = () => {
	let params = useParams();
	const [user, setUser] = useState<UserProps>();
	const navigate = useNavigate();

	const onSubmit = () => {};
	const theme = useTheme();

	useEffect(() => {
		const fetchUser = async () => {
			const response = await axios.get(ENDPOINTS.FETCHUSER + `/${params.id}`, config);
			setUser(response.data);
		};
		fetchUser();
	}, []);

	return (
		<Container
			maxWidth={'xs'}
			sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)` }}
		>
			<UserProfile {...user} />
		</Container>
	);
};

export default User;
