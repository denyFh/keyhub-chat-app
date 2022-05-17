import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ authenticated, redirectPath='landing'}) => {
    if (authenticated === false) {
        return <Navigate to={redirectPath} replace/>
    }
    
    return <Outlet />;
}

export default ProtectedRoute;