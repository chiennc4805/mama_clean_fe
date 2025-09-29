import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import RequireAuth from './components/context/require.auth.jsx';
import RoleRoute from './components/context/role.route.jsx';
import AccountForgetPasswordPage from './pages/account_forget_password.jsx';
import AccountRegistrationPage from './pages/account_register.jsx';
import BookingPage from './pages/booking.jsx';
import UnauthorizedPage from './pages/error/403.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import CleanerManagement from './pages/management/cleaner_management.jsx';
import CustomerManagement from './pages/management/customer_management.jsx';
import HomeManagement from './pages/management/home_management.jsx';
import UserProfile from './pages/user.profile.jsx';
import store from './redux/store.js';
import './styles/global.css';

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				index: true,
				element: <HomePage />
			},
			{
				path: "login",
				element: <LoginPage />
			},
			{
				path: "register",
				element: <AccountRegistrationPage />
			},
			{
				path: "forget-password",
				element: <AccountForgetPasswordPage />
			},
			{
				path: "profile",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CUSTOMER"]}>
							<UserProfile />
						</RoleRoute>
					</RequireAuth>)
			},
			{
				path: "booking",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CUSTOMER"]}>
							<BookingPage />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN", "CLEANER"]}>
							<HomeManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management/manage-customer",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN", "CLEANER"]}>
							<CustomerManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management/manage-cleaner",
				element: <CleanerManagement />
			},
			{
				path: "management/manage-order",
				element: <CleanerManagement />
			},
			{
				path: "management/manage-service",
				element: <CleanerManagement />
			},
			{
				path: "/management/manage-assignment",
				element: <CleanerManagement />
			},
			{
				path: "403",
				element: <UnauthorizedPage />
			},


			// {
			// 	path: "schedule/:name",
			// 	element: <SchedulePage />
			// },

		]
	},
]);


createRoot(document.getElementById('root')).render(
	<AuthWrapper>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</AuthWrapper>
)
