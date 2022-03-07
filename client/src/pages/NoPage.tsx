import { Typography } from '@mui/material';
import React from 'react';

/**
 * Default page when an invalid route is entered by user
 */
const NoPage = () => {
	return <Typography variant={'h1'}>Page doesn't exists</Typography>;
};

export default NoPage;
