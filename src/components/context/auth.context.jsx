import { createContext, useEffect, useState } from 'react';
import { getAccountAPI } from '../../services/api.service';

const AuthContext = createContext({
    id: "",
    name: "",
    role: ""
});

const AuthWrapper = ({ children }) => {
    const [user, setUser] = useState({
        id: "",
        name: "",
        role: ""
    })

    const [isAppLoading, setIsAppLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("access_token");
            if (token) {
                try {
                    const res = await getAccountAPI();
                    setUser(res.data.user); // lưu luôn role
                } catch (err) {
                    setUser(null);
                }
            }
            setIsAppLoading(false)
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAppLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthWrapper };

