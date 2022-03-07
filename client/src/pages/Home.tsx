import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const theme = useTheme();
	const navigate = useNavigate();

	return (
		<>
			<Container
				fixed
				sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)` }}
			>
				<Box p={5}>
					<Typography variant={'h1'}>Friday CRUD App</Typography>
					<Grid container spacing={1} my={2} justifyContent='center'>
						<Grid item xs={12} sm={4} md={3}>
							<Button color='primary' variant='contained' onClick={() => navigate('/register')} sx={{ width: '100%' }}>
								Register
							</Button>
						</Grid>
						<Grid item xs={12} sm={4} md={3}>
							<Button color='primary' variant='contained' onClick={() => navigate('/login')} sx={{ width: '100%' }}>
								Login
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</>
	);
};

export default Home;
