import { BankOutlined, ClockCircleOutlined, DollarOutlined, MenuUnfoldOutlined, ReadOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, Drawer } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useContext, useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from './components/context/auth.context';
import FooterLayout from './components/layout/footer';
import HeaderLayOut from './components/layout/header';
import FooterManagement from './components/layout/management/footer_management';
import AdminHeader from './components/layout/management/header_management';
import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import dayjs from "dayjs";
import "dayjs/locale/vi";

function App() {

	const { Header, Content } = Layout;
	const { user, setUser, isAppLoading } = useContext(AuthContext)
	const [isMobile, setIsMobile] = useState(false);
	const [drawerVisible, setDrawerVisible] = useState(false);
	const location = useLocation();

	// Detect screen size
	useEffect(() => {
		const handleResize = () => {
			const mobile = window.innerWidth < 768;
			setIsMobile(mobile);
			if (!mobile && drawerVisible) {
				setDrawerVisible(false);
			}
		};

		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [drawerVisible]);

	// Close drawer on route change
	useEffect(() => {
		if (drawerVisible) {
			setDrawerVisible(false);
		}
	}, [location.pathname]);

	if (isAppLoading) return <>Đang tải vui lòng chờ</>

	const siderStyle = {
		height: '100vh',
		position: 'sticky',
		insetInlineStart: 0,
		top: 0,
		bottom: 0,
		scrollbarWidth: 'thin',
		scrollbarGutter: 'stable',
		backgroundColor: "white",
		maxWidth: "300px"
	};

	const menuItems = user?.role?.name === "SUPER_ADMIN" ? [
		{
			key: "customer-management",
			label: <Link to={"/management/customers"}>Quản lý khách hàng</Link>,
			icon: <UserOutlined />
		},
		{
			key: "cleaner_management",
			label: <Link to={"/management/cleaners"}>Quản lý người dọn dẹp</Link>,
			icon: <UserOutlined />
		},
		{
			key: "order_management",
			label: <Link to={"/management/orders"}>Quản lý đơn hàng</Link>,
			icon: <UserOutlined />
		},
		{
			key: "service_management",
			label: <Link to={"/management/services"}>Quản lý dịch vụ</Link>,
			icon: <UserOutlined />
		},
		{
			key: "assignments",
			label: <Link to={"/management/assignments"}>Phân công thủ công</Link>,
			icon: <UserOutlined />
		},
		{
			key: "profit_management",
			label: <Link to={"/management/transactions"}>Quản lý Thanh toán & Thu nhập</Link>,
			icon: <UserOutlined />
		},
		{
			key: "feedback_report_management",
			label: <Link to={"/management/feedbacks"}>Quản lý đánh giá</Link>,
			icon: <UserOutlined />
		}
	] : [
		{
			key: "personal_job",
			label: <Link to="/cleaner/jobs">Công việc cá nhân</Link>,
			icon: <UserOutlined />,
		},
		{
			key: "schedule",
			label: <Link to="/cleaner/schedules">Lịch làm việc</Link>,
			icon: <ReadOutlined />
		},
		{
			key: "available_job",
			label: <Link to="/cleaner/avjobs">Việc có sẵn</Link>,
			icon: <BankOutlined />
		},
		{
			key: "profit",
			label: <Link to="/cleaner/incomes">Thu nhập & Thanh toán</Link>,
			icon: <ClockCircleOutlined />,
		},
		{
			key: "cleaner_profile",
			label: <Link to="/cleaner/profiles">Hồ sơ</Link>,
			icon: <DollarOutlined />
		},
		{
			key: "feedback",
			label: <Link to="/cleaner/feedbacks">Đánh giá</Link>,
			icon: <TeamOutlined />
		}
	];

	return (
		<>
			<ConfigProvider locale={viVN}>

				{!user || user.id === "" || user.role?.name === "CUSTOMER" ?
					<Layout>
						<Header
							style={{
								width: "100%",
								background: "#fff",
								padding: 0,
								height: isMobile ? "10vh" : "13vh"
							}}>
							<HeaderLayOut />
						</Header>
						<Content>
							<Outlet
								user={user}
							/>
						</Content>
						<FooterLayout />
					</Layout>

					:

					<Layout>
						<Header style={{
							width: "100%",
							background: "#fff",
							padding: 0,
							height: "9vh"
						}}>
							<div style={{
								display: 'flex',
								alignItems: 'center',
								height: '100%',
								padding: '0 20px'
							}}>
								{isMobile && (
									<Button
										type="text"
										icon={<MenuUnfoldOutlined style={{ fontSize: '20px', color: '#000' }} />}
										onClick={() => setDrawerVisible(true)}
										style={{
											marginRight: '16px',
											fontSize: '20px',
											width: '40px',
											height: '40px'
										}}
									/>
								)}
								<div style={{ flex: 1 }}>
									<AdminHeader />
								</div>
							</div>
						</Header>
						<Layout>
							{/* Desktop Sider - Hidden on mobile */}
							{!isMobile && (
								<Sider width={300} trigger={null} style={siderStyle}>
									<Menu
										mode="inline"
										style={{
											height: 'calc(100vh - 60px)',
											overflowY: "auto",
											scrollbarWidth: "thin",
										}}
										items={menuItems}
									/>
								</Sider>
							)}

							{/* Mobile Drawer */}
							<Drawer
								title="Menu"
								placement="left"
								onClose={() => setDrawerVisible(false)}
								open={drawerVisible}
								width={280}
								styles={{
									body: { padding: 0 }
								}}
							>
								<Menu
									mode="inline"
									style={{
										border: 'none',
									}}
									items={menuItems}
								/>
							</Drawer>

							<Content style={{ background: "#fff" }}>
								<Outlet />
							</Content>
						</Layout>
						<Footer
							style={{
								padding: 0,
							}}
						>
							<FooterManagement />
						</Footer>
					</Layout >
				}
			</ConfigProvider>

			<style jsx>{`
				/* Hide mobile menu button on desktop */
				@media (min-width: 768px) {
					.mobile-menu-btn {
						display: none !important;
					}
				}

				/* Responsive adjustments */
				@media (max-width: 767px) {
					.ant-layout-sider {
						display: none !important;
					}
				}
			`}</style>
		</>
	)
}

export default App;