import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./auth.context";

const RequireAuth = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) {
        // nhớ lại trang hiện tại bằng state
        return <Navigate to="/login" replace />;
    }
    return children;
};

export default RequireAuth;