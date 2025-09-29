import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => (

    <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={<Button type="primary" onClick={() => useNavigate("/403")}>Back Home</Button>}
    />
);
export default UnauthorizedPage;