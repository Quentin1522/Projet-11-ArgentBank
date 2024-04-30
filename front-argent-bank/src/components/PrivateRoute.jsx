import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        setIsChecking(false);
    }, []);

    if (!token) {
        return <Navigate to="/signIn" replace />;
    }

    return children;
};

export default PrivateRoute;
