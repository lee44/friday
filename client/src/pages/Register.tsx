import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Grid, Link, Paper, Typography, useTheme } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';
import { InputText } from '../components/form/InputText';
import { SelectDropDown } from '../components/form/SelectDropDown';
import { axios_config } from '../config/axios';
import { ENDPOINTS } from '../config/Endpoints';
import { useAppDispatch } from '../redux/hooks';
import { updateUser } from '../redux/userSlice';

export type RegisterFormInput = {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	role: string;
};
const defaultValues = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
};

/**
 * * Register Page that provides input validation and directs user to dashboard upon submission
 */
const Register = () => {
	const [error, setError] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required').min(2, 'Username must be at least 6 characters').max(20, 'Username must not exceed 20 characters'),
		email: Yup.string().required('Email is required').email('Email is invalid'),
		password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(40, 'Password must not exceed 40 characters'),
		confirmPassword: Yup.string()
			.required('Confirm Password is required')
			.oneOf([Yup.ref('password'), null], 'Confirm Password does not match'),
		role: Yup.string().required('Role is required'),
	});
	const { handleSubmit, control } = useForm<RegisterFormInput>({ defaultValues: defaultValues, resolver: yupResolver(validationSchema) });
	const onSubmit = async (formData: RegisterFormInput) => {
		try {
			const { data } = await axios.post(ENDPOINTS.REGISTER, formData, axios_config);
			dispatch(updateUser(data));

			navigate('/dashboard');
		} catch (error) {
			setError('Register Failed');
			setTimeout(() => {
				setError('');
			}, 5000);
		}
	};
	const theme = useTheme();

	return (
		<Container
			maxWidth={'xs'}
			sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - 10px)` }}
		>
			<Paper variant='outlined'>
				<Box px={3} py={2}>
					<Typography variant='h1' align='center' my={2}>
						Register
					</Typography>

					<Grid container spacing={2} direction='column'>
						<Grid item xs={12} sm={6}>
							<InputText name='name' control={control} label='Name' />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText name='email' control={control} label='Email' />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText name='password' control={control} label='Password' />
						</Grid>
						<Grid item xs={12} sm={6}>
							<InputText name='confirmPassword' control={control} label='Confirm Password' />
						</Grid>
						<Grid item xs={12}>
							<SelectDropDown name='role' control={control} />
						</Grid>
					</Grid>

					<Box mt={3}>
						<Button variant='contained' color='primary' onClick={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
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

export default Register;
