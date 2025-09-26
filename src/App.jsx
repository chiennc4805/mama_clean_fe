import { Layout } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from './components/context/auth.context';
import FooterLayout from './components/layout/footer';
import HeaderLayOut from './components/layout/header';
import { getAccountAPI, logoutAPI } from './services/api.service';

function App() {
	const { Header, Sider, Content } = Layout;
	const [collapsed, setCollapsed] = useState(false);


	const { user, setUser } = useContext(AuthContext)

	useEffect(() => {
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

	const handleLogout = async (mess) => {
		const res = await logoutAPI()
		if (res.data) {
			//clear data
			localStorage.removeItem("access_token")
			setUser({
				id: "",
				name: "",
				role: ""
			})
			if (mess) {
				message.success("Đăng xuất thành công.")
			}

			//redirect to home
			navigate("/")
		}
	}

	return (
		<>
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
					<Outlet />
				</Content>

				<FooterLayout />

			</Layout>
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