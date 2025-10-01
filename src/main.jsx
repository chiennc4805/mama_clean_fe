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
import BookingManagement from './pages/management/booking_management.jsx';
import CleanerProfile from './pages/management/cleaner.profile.jsx';
import CleanerManagement from './pages/management/cleaner_management.jsx';
import CustomerManagement from './pages/management/customer_management.jsx';
import HomeManagement from './pages/management/home_management.jsx';
import ManualAssignment from './pages/management/manual.assignment.jsx';
import PersonalJob from './pages/management/personal.job.jsx';
import ServiceManagement from './pages/management/service_management.jsx';
import TopUpPage from './pages/top.up.jsx';
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
				path: "top-up",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CUSTOMER"]}>
							<TopUpPage />
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
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<CustomerManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management/cleaner-profile",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CLEANER"]}>
							<CleanerProfile />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management/manage-cleaner",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<CleanerManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management/manage-order",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<BookingManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management/manage-service",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<ServiceManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "/management/manage-assignment",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<ManualAssignment />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "/management/jobs",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CLEANER"]}>
							<PersonalJob />
						</RoleRoute>
					</RequireAuth>
				)
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
