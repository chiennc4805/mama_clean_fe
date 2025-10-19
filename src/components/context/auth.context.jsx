import { createContext, useEffect, useState } from 'react';
import { getAccountAPI } from '../../services/api.service';
import { message } from 'antd';

const AuthContext = createContext({
    id: "",
    name: "",
    email: "",
    balance: "",
    role: {
        name: ""
    },
    avatar: ""
});

const AuthWrapper = ({ children }) => {
    // {
    //     id: "",
    //     name: "",
    //     email: "",
    //     balance: 0,
    //     role: {
    //         name: ""
    //     },
    //     avatar: ""
    // }
    const [user, setUser] = useState(null)
    const [isAppLogout, setIsAppLogout] = useState(false)
    const [isAppLoading, setIsAppLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("access_token");
            if (token) {
                const res = await getAccountAPI();
                if (res.data) {
                    setUser(res.data.user);
                    setIsAppLoading(false);
                } else {
                    setUser(null);
                    message.error(res.message.trim())
                    setIsAppLoading(false);
                    localStorage.removeItem("access_token")
                }
            } else {
                setUser(null);
                setIsAppLoading(false);
            }
        }
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading, isAppLogout, setIsAppLogout }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthWrapper };

