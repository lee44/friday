import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

const RequiredAuth = ({ children }: { children: JSX.Element }) => {
	let userSelect = useAppSelector((state) => state.user);
	let location = useLocation();

	// if (userSelect.user.name === '') {
	// 	return <Navigate to='/login' state={{ from: location }} replace />;
	// }

	return children;
};

export default RequiredAuth;
