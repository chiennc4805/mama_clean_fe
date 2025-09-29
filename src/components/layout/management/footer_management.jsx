import {
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    TwitterOutlined
} from '@ant-design/icons';
import { Layout, Space } from 'antd';

const { Footer } = Layout;

const FooterManagement = () => {
    return (
        <Footer
            style={{
                backgroundColor: '#fff',
                padding: '20px 150px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #f0f0f0'
            }}
        >
            {/* Left side - Links */}
            <Space size={24}>
                <a href="#" style={{ color: '#666', fontSize: '14px' }}>Công ty</a>
                <a href="#" style={{ color: '#666', fontSize: '14px' }}>Tài nguyên</a>
                <a href="#" style={{ color: '#666', fontSize: '14px' }}>Pháp lý</a>
            </Space>

            {/* Right side - Social Icons */}
            <Space size={16}>
                <FacebookOutlined style={{ color: '#666', fontSize: '16px' }} />
                <TwitterOutlined style={{ color: '#666', fontSize: '16px' }} />
                <InstagramOutlined style={{ color: '#666', fontSize: '16px' }} />
                <LinkedinOutlined style={{ color: '#666', fontSize: '16px' }} />
            </Space>
        </Footer>
    );
};

export default FooterManagement;