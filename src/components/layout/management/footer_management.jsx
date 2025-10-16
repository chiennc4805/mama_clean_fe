import {
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    TwitterOutlined
} from '@ant-design/icons';
import { Layout, Space } from 'antd';
import { useEffect, useState } from 'react';

const { Footer } = Layout;

const FooterManagement = () => {
    const [fontSize, setFontSize] = useState(14);
    const [iconSize, setIconSize] = useState(16);
    const [paddingX, setPaddingX] = useState(150);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setFontSize(12);
                setIconSize(14);
                setPaddingX(30);
            } else if (window.innerWidth < 992) {
                setFontSize(13);
                setIconSize(15);
                setPaddingX(60);
            } else {
                setFontSize(14);
                setIconSize(16);
                setPaddingX(150);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Footer
            style={{
                backgroundColor: '#fff',
                padding: `20px ${paddingX}px`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #f0f0f0',
                transition: 'all 0.2s ease'
            }}
        >
            {/* Left side - Links */}
            <Space size={24}>
                <a href="#" style={{ color: '#666', fontSize }}>{'Công ty'}</a>
                <a href="#" style={{ color: '#666', fontSize }}>{'Tài nguyên'}</a>
                <a href="#" style={{ color: '#666', fontSize }}>{'Pháp lý'}</a>
            </Space>

            {/* Right side - Social Icons */}
            <Space size={16}>
                <FacebookOutlined style={{ color: '#666', fontSize: iconSize }} />
                <TwitterOutlined style={{ color: '#666', fontSize: iconSize }} />
                <InstagramOutlined style={{ color: '#666', fontSize: iconSize }} />
                <LinkedinOutlined style={{ color: '#666', fontSize: iconSize }} />
            </Space>
        </Footer>
    );
};

export default FooterManagement;
