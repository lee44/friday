import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { axios_config } from '../../config/axios';
import { ENDPOINTS } from '../../config/Endpoints';
import useAxios from '../../hooks/useAxios';
import { InputText } from '../form/InputText';

type FormInput = {
	name: string;
};

const defaultValues = {
	name: '',
};

const UserProfile = ({ ...props }) => {
	const { id, email, name, role } = props;
	const custom_axios = useAxios();

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(20, 'Name must not exceed 20 characters'),
	});
	const { handleSubmit, control, reset } = useForm<FormInput>({ defaultValues: defaultValues, resolver: yupResolver(validationSchema) });
	const onUpdate = async (formData: FormInput) => {
		try {
			await custom_axios.put(ENDPOINTS.UPDATE_USER + `/${id}`, formData, axios_config);
		} catch (error) {}
	};
	const onDelete = async () => {
		try {
			await custom_axios.delete(ENDPOINTS.DELETE_USER + `/${id}`, axios_config);
		} catch (error) {}
	};

	useEffect(() => {
		reset({ name: name });
	}, [name]);

	return (
		<Paper>
			<Box px={3} py={2}>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<Typography variant='h3'>Name</Typography>
					</Grid>
					<Grid item xs={6}>
						<InputText name='name' control={control} />
					</Grid>
					<Grid item xs={6}>
						<Typography variant='h3'>Email</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='h3'>{email}</Typography>
					</Grid>

					<Grid item xs={6}>
						<Typography variant='h3'>Role</Typography>
					</Grid>
					<Grid item xs={6}>
						<Typography variant='h3'>{role}</Typography>
					</Grid>
				</Grid>

				<Box mt={3}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Button variant='contained' color='primary' onClick={handleSubmit(onUpdate)} sx={{ width: '100%' }}>
								Update
							</Button>
						</Grid>

						<Grid item xs={6}>
							<Button variant='contained' color='error' onClick={handleSubmit(onDelete)} sx={{ width: '100%' }}>
								Delete
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Paper>
	);
};

export default UserProfile;
