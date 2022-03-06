import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';

export type InputProps = {
	name: string;
	control: any;
	label?: string;
};

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
