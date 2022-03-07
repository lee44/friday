import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

export type InputProps = {
	name: string;
	control: any;
	label?: string;
};
/**
 * Component used for selecting user role: Admin or User
 * @param name reference for reack hook form
 * @param control contains methods for registering the component to reack hook form
 * @param label a label for the select field
 * @returns a wrapped select field with a controller that communicates with react hook form
 */
export const SelectDropDown = ({ name, control }: InputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
				<Box sx={{ minWidth: 120 }}>
					<FormControl fullWidth error={!!error}>
						<InputLabel id='demo-simple-select-label'>Role</InputLabel>
						<Select label='Age' onChange={onChange} value={value ? value : ''}>
							<MenuItem value={'Admin'}>Admin</MenuItem>
							<MenuItem value={'User'}>User</MenuItem>
						</Select>
						{error && <FormHelperText>Choose a role</FormHelperText>}
					</FormControl>
				</Box>
			)}
		/>
	);
};
