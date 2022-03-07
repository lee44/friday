import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export type InputProps = {
	name: string;
	control: any;
	label?: string;
};
/**
 * Component used in all input fields throughout the app
 * @param name reference for reack hook form
 * @param control contains methods for registering the component to reack hook form
 * @param label a label for the textfield
 * @returns a wrapped textfield with a controller that communicates with react hook form
 */
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
