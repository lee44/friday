import { Box, Button, Container, Grid, Link, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import InputText from '../components/form/InputText';

const SignUp = () => {
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
						Register
					</Typography>

					<Grid container spacing={2} direction='column'>
						<Grid item xs={12} sm={6}>
							<InputText label='Username' />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText label='Email' />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText label='Password' />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText label='Confirm Password' />
						</Grid>
					</Grid>

					<Box mt={3}>
						<Button variant='contained' color='primary' onClick={handleSubmit} sx={{ width: '100%' }}>
							Register
						</Button>
					</Box>
					<Box mt={1} textAlign='left'>
						<Link href='/login' underline='hover' color='primary'>
							Already have an account? Login
						</Link>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default SignUp;
