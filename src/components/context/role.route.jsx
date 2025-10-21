// RoleRoute.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./auth.context";
import { Spin } from "antd";

const RoleRoute = ({ allowedRoles, children }) => {

    const { user, isAppLoading } = useContext(AuthContext);
    const location = useLocation();


    if (isAppLoading)
		return (
			<div style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh"
			}}>
				<Spin size="large" tip="Đang tải, vui lòng chờ..." />
			</div>
		);

    if (!allowedRoles.includes(user.role.name)) {
        return <Navigate to="/403" replace />;
    }

    return children;
};

export default RoleRoute;
