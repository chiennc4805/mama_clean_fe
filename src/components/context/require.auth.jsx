import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./auth.context";

const RequireAuth = ({ children }) => {
    const { user, isAppLogout, setIsAppLogout } = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        if (user && isAppLogout) {
            setIsAppLogout(false); // reset flag sau redirect 
        }
    }, [user, isAppLogout, setIsAppLogout]);

    if (!user) {
        if (!isAppLogout) {
            return <Navigate to="/login" replace state={{ from: location.pathname }} />
        }
        else {
            return <Navigate to="/login" replace />
        }
    }

    return children;
};

export default RequireAuth;