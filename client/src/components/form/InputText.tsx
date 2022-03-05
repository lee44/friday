import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export type InputProps = {
	name: string;
	control: any;
	label: string;
	setValue?: any;
};

export const InputText = ({ name, control, label }: InputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
				<TextField
					helperText={error ? error.message : null}
					size='small'
					error={!!error}
					onChange={onChange}
					value={value}
					fullWidth
					label={label}
					variant='outlined'
				/>
			)}
		/>
	);
};
