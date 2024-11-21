import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
    const token = useSelector((state) => state.auth.token);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (roles && roles.length > 0 && !roles.includes(token.role)) {
        return <Navigate to="/not-authorized" state={{ from: location }} />;
    }

    return <Component {...rest} />;
};

PrivateRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
};

export default PrivateRoute;