import { BankOutlined, ClockCircleOutlined, DollarOutlined, ReadOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from './components/context/auth.context';
import FooterLayout from './components/layout/footer';
import HeaderLayOut from './components/layout/header';
import FooterManagement from './components/layout/management/footer_management';
import AdminHeader from './components/layout/management/header_management';
import { getAccountAPI } from './services/api.service';

function App() {

	const { Header, Content } = Layout;
	const { user, setUser } = useContext(AuthContext)


	useEffect(() => {
		console.log(user)
		fetchUserInfo()
	}, [])

	const fetchUserInfo = async () => {
		if (localStorage.getItem('access_token')) {
			const res = await getAccountAPI()
			if (res.data) {
				setUser(res.data.user)
			}
		}
	}

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

	return (
		<>
			{user.id === "" || user?.role.name === "CUSTOMER" ?
				<Layout>
					<Header
						style={{
							width: "100%",
							background: "#fff", // Đặt màu nền trắng cho Header
							padding: 0,         // Xóa padding mặc định
							height: "13vh"
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
						background: "#fff", // Đặt màu nền trắng cho Header
						padding: 0,         // Xóa padding mặc định
						height: "9vh"
					}}>
						<AdminHeader />
					</Header>
					<Layout>
						<Sider width={300} trigger={null} style={siderStyle}>
							<Menu
								mode="inline"
								style={{
									height: 'calc(100vh - 60px)',
									overflowY: "auto",
									scrollbarWidth: "thin",
								}}
								items={[
									...(user?.role.name === "SUPER_ADMIN" ?
										[
											{
												key: "customer_management",
												label: "Quản lý khách hàng",
												icon: <UserOutlined />
											},
											{
												key: "cleaner_management",
												label: "Quản lý người dọn dẹp",
												icon: <UserOutlined />
											},
											{
												key: "order_management",
												label: "Quản lý đơn hàng",
												icon: <UserOutlined />
											},
											{
												key: "service_management",
												label: "Quản lý dịch vụ",
												icon: <UserOutlined />
											},
											{
												key: "divide_job_manually",
												label: "Phân công thủ công",
												icon: <UserOutlined />
											},
											{
												key: "profit_management",
												label: "Quản lý Thanh toán & Thu nhập",
												icon: <UserOutlined />
											},
											{
												key: "feedback_report_management",
												label: "Quản lý Đánh giá & Báo cáo Vi phạm",
												icon: <UserOutlined />
											},
											{
												key: "voucher_management",
												label: "Quản lý khuyến mãi & Mã giảm giá",
												icon: <UserOutlined />
											}
										]
										:
										[
											{
												key: "personal_job",
												label: "Công việc cá nhân",
												icon: <UserOutlined />,
											},
											{
												key: "schedule",
												label: <Link to="/subject">lịch làm việc</Link>,
												icon: <ReadOutlined />
											},
											{
												key: "available_job",
												label: <Link to="/class">Việc có sẵn</Link>,
												icon: <BankOutlined />
											},
											{
												key: "profit",
												label: <Link to="/attendance">Thu nhập & Thanh toán</Link>,
												icon: <ClockCircleOutlined />,
											},
											{
												key: "contract",
												label: <Link to="/fee">Hồ sơ</Link>,
												icon: <DollarOutlined />
											},
											{
												key: "feedback",
												label: <Link to="/user">Đánh giá</Link>,
												icon: <TeamOutlined />
											}
										])
								]}
							/>
						</Sider>
						<Content>
							Content
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
		</>
	)
}

export default App;


{/* <Button
	type="text"
	icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
	onClick={() => setCollapsed(!collapsed)}
	style={{
		fontSize: '16px',
		width: 64,
		height: 64,
	}}
/>
{
	user && user.id ?
	<Dropdown menu={{ items }} trigger={['click']}>
		<div
			onClick={e => e.preventDefault()}
			style={{ margin: "0px 10px", cursor: "pointer" }}>
			Welcome {user.name}
			<Avatar size="middle" icon={<UserOutlined />} style={{ margin: "0px 15px" }} />
		</div>
	</Dropdown>
	:
	<>
		<Link to="/login" style={{ margin: "0px 50px" }}>Đăng nhập</Link>
	</>
} */}

// {
// 	key: "campus",
// 	label: "Cơ sở",
// 	icon: <EnvironmentOutlined />,
// 	children: [
// 		{
// 			label: <Link to="/campus">Thông tin</Link>
// 		},
// 		{
// 			label: <Link to="/facility">Thiết bị</Link>
// 		},
// 	]
// },