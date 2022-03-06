import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { axios_config } from '../../config/axios';
import { ENDPOINTS } from '../../config/Endpoints';
import { InputText } from './InputText';

type FormInput = {
	name: string;
};

const defaultValues = {
	name: '',
};

const UserProfile = ({ ...props }) => {
	const { id, email, name, role } = props;
	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required').min(6, 'Name must be at least 6 characters').max(20, 'Name must not exceed 20 characters'),
	});
	const { handleSubmit, control, setValue, reset } = useForm<FormInput>({ defaultValues: defaultValues, resolver: yupResolver(validationSchema) });
	const onSubmit = async (formData: FormInput) => {
		try {
			await axios.post(ENDPOINTS.UPDATEUSER, formData, axios_config);
		} catch (error) {}
	};

	useEffect(() => {
		reset({ name: name });
	}, [name]);

	return (
		<Paper>
			<Box px={3} py={2}>
				<Typography variant='h1' align='center' my={2}>
					Hi {name}
				</Typography>

				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Typography variant='h2'>Email</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='h2'>{email}</Typography>
					</Grid>

					<Grid item xs={6}>
						<Typography variant='h2'>Name</Typography>
					</Grid>
					<Grid item xs={6}>
						<InputText name='name' control={control} />
					</Grid>

					<Grid item xs={6}>
						<Typography variant='h2'>Role</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='h2'>{role}</Typography>
					</Grid>
				</Grid>

				<Box mt={3}>
					<Button variant='contained' color='primary' onClick={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
						Update
					</Button>
				</Box>
			</Box>
		</Paper>
	);
};

export default UserProfile;
