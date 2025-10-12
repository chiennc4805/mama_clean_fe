import { BankOutlined, ClockCircleOutlined, DollarOutlined, ReadOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
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

	return (
		<>
			<ConfigProvider locale={viVN}>

				{!user || user.id === "" || user.role?.name === "CUSTOMER" ?
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
										...(user?.role?.name === "SUPER_ADMIN" ?
											[
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
											]
											:
											[
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
											])
									]}
								/>
							</Sider>
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
		</>
	)
}

export default App;