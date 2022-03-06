import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { axios_config } from '../../config/axios';
import { ENDPOINTS } from '../../config/Endpoints';

const NavBar = ({ ...props }) => {
	const { title } = props;
	const navigate = useNavigate();

	const handleLogOut = async () => {
		try {
			await axios.get(ENDPOINTS.LOGOUT, axios_config);
			navigate('/login');
		} catch (error) {}
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h1' component='div' sx={{ flexGrow: 1 }}>
						{title}
					</Typography>

					<Button color='secondary' variant='contained' onClick={handleLogOut}>
						Log Out
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default NavBar;
