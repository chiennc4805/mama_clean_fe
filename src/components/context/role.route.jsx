// RoleRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./auth.context";

const RoleRoute = ({ allowedRoles, children }) => {
    const { user, isAppLoading } = useContext(AuthContext);

    console.log(user.role.name)
    console.log(allowedRoles)

    if (isAppLoading) return <div>Đang tải quyền...</div>;

    if (!user) return <Navigate to="/login" replace />;

    if (!allowedRoles.includes(user.role.name)) {
        return <Navigate to="/403" replace />; // hoặc trang lỗi 403
    }

    return children;
};

export default RoleRoute;
