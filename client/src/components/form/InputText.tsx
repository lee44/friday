import { TextField } from '@mui/material';
import React from 'react';

type inputProps = {
	label: string;
};

const InputText: React.FC<inputProps> = ({ label }) => {
	return <TextField size='small' fullWidth label={label} variant='outlined' />;
};

export default InputText;
