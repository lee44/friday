import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useState } from 'react';

export const Info = ({ ...props }) => {
	const [open, setOpen] = useState(true);

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<Snackbar open={open} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
			<Alert onClose={handleClose} severity={props.alert.severity} sx={{ width: '100%' }}>
				{props.alert.message}
			</Alert>
		</Snackbar>
	);
};
