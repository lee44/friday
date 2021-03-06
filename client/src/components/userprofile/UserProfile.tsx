import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { axios_config } from '../../config/axios';
import { ENDPOINTS } from '../../config/Endpoints';
import useAxios from '../../hooks/useAxios';
import { UserProps } from '../../pages/Dashboard';
import { useAppSelector } from '../../redux/hooks';
import { Info } from '../Alerts/Info';
import { InputText } from '../form/InputText';

type FormInput = {
	name: string;
};

type alertInput = {
	severity: string;
	message: string;
};

const defaultValues = {
	name: '',
};

/**
 * * Component that renders the user information like email, password, etc
 * * Admin can update or delete user profile but can't delete his/her profile
 * * User can edit name but not delete his/her profile
 */
const UserProfile = ({ ...props }) => {
	const { id, email, name, role, setUser } = props;
	const [alert, setAlert] = useState<alertInput>();
	const currentUser = useAppSelector((state) => state.user.user);
	const custom_axios = useAxios();

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Name is required').min(2, 'Name must be at least 2 characters').max(20, 'Name must not exceed 20 characters'),
	});
	const { handleSubmit, control, reset } = useForm<FormInput>({ defaultValues: defaultValues, resolver: yupResolver(validationSchema) });
	const onUpdate = async (formData: FormInput) => {
		try {
			await custom_axios.put(ENDPOINTS.UPDATE_USER + `/${id}`, formData, axios_config);
			setAlert({ severity: 'success', message: 'Updated Successfully' });
		} catch (error) {
			setAlert({ severity: 'error', message: 'Something went wrong' });
		}
	};
	const onDelete = async () => {
		try {
			await custom_axios.delete(ENDPOINTS.DELETE_USER + `/${id}`, axios_config);
			setUser((list: UserProps) => {
				return list.filter((element: { id: any }) => element.id !== id);
			});
			setAlert({ severity: 'success', message: 'Deleted Successfully' });
		} catch (error) {
			setAlert({ severity: 'error', message: 'Something went wrong' });
		}
	};

	useEffect(() => {
		reset({ name: name });
	}, [name]);

	return (
		<Paper variant='outlined'>
			<Box px={3} py={5}>
				{alert && <Info alert={alert}></Info>}

				<Grid container spacing={2}>
					<Grid item xs={6} justifyContent='center' alignItems='center'>
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
						<Grid item xs={currentUser?.role === 'Admin' ? 6 : 12}>
							<Button variant='contained' color='primary' onClick={handleSubmit(onUpdate)} sx={{ width: '100%' }}>
								Update
							</Button>
						</Grid>

						{currentUser?.role === 'Admin' ? (
							<Grid item xs={6}>
								<Button
									variant='contained'
									color='error'
									onClick={handleSubmit(onDelete)}
									sx={{ width: '100%' }}
									disabled={id === currentUser.id ? true : false}
								>
									Delete
								</Button>
							</Grid>
						) : (
							''
						)}
					</Grid>
				</Box>
			</Box>
		</Paper>
	);
};

export default UserProfile;
