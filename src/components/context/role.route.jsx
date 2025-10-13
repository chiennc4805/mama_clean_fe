// RoleRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./auth.context";

const RoleRoute = ({ allowedRoles, children }) => {

    const { user, isAppLoading } = useContext(AuthContext);
    const location = useLocation();


    if (isAppLoading) return <div>Đang tải quyền...</div>;

    if (!allowedRoles.includes(user.role.name)) {
        return <Navigate to="/403" replace />;
    }

    return children;
};

export default RoleRoute;
