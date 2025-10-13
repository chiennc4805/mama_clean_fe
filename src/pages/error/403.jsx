import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../components/context/auth.context';
import { useContext } from 'react';

const UnauthorizedPage = () => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate(); // 👈 gọi hook ở đây

    const navigateToHomePage = () => {
        if (user.role.name === "CUSTOMER") {
            navigate("/")
        } else {
            navigate("/management")
        }
    }

    return (
        <Result
            status="403"
            title="403"
            subTitle="Rất tiếc, bạn không có quyền truy cập vào đường dẫn này."
            extra={
                <Button type="primary" onClick={navigateToHomePage}>
                    Về trang chủ
                </Button>
            }
        />
    );
};

export default UnauthorizedPage;