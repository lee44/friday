import { Box, Button, Container, Grid, Link, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import InputText from '../components/form/InputText';

const Login = () => {
	const theme = useTheme();

	const handleSubmit = () => {};

	return (
		<Container
			maxWidth={'xs'}
			sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)` }}
		>
			<Paper>
				<Box px={3} py={2}>
					<Typography variant='h1' align='center' my={2}>
						Login
					</Typography>
					<Grid container spacing={2} direction='column'>
						<Grid item xs={12} sm={6}>
							<InputText label='Email' />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText label='Password' />
						</Grid>
					</Grid>

					<Box mt={2}>
						<Button variant='contained' color='primary' onClick={handleSubmit} sx={{ width: '100%' }}>
							Login
						</Button>
					</Box>
					<Box mt={1} textAlign='left'>
						<Link href='/signup' underline='hover' color='primary'>
							Don't have an account? Sign Up
						</Link>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default Login;
