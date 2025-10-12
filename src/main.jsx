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
import FeedbackPage from './pages/feedback.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import AvailableJobPage from './pages/management/cleaner.available.job.jsx';
import BookingManagement from './pages/management/admin.booking.management.jsx';
import CleanerProfile from './pages/management/cleaner.profile.jsx';
import CleanerSchedulePage from './pages/management/cleaner.schedule.jsx';
import CleanerManagement from './pages/management/admin.cleaner.management.jsx';
import CustomerManagement from './pages/management/admin.customer.management.jsx';
import HomeManagement from './pages/management/home.management.jsx';
import ManualAssignment from './pages/management/admin.manual.assignment.jsx';
import PersonalJob from './pages/management/cleaner.personal.job.jsx';
import ServiceManagement from './pages/management/admin.service.management.jsx';
import TopUpPage from './pages/top.up.jsx';
import UserProfile from './pages/user.profile.jsx';
import store from './redux/store.js';
import './styles/global.css';
import OrderManagement from './pages/order.management.jsx';
import CustomerReviews from './pages/management/cleaner.feedback.jsx';
import CleaningService from './pages/services.header.item.jsx';
import IncomePaymentPage from './pages/management/cleaner.income.jsx';
import AdminTransactionManagementPage from './pages/management/admin.transaction.management.jsx';
import FeedbackManagement from './pages/management/admin.feedback.management.jsx';


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
				path: "feedback",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CUSTOMER"]}>
							<FeedbackPage />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "order",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CUSTOMER"]}>
							<OrderManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "services",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CUSTOMER"]}>
							<CleaningService />
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
				path: "management/customers",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<CustomerManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management/cleaners",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<CleanerManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "/management/orders",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<BookingManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management/services",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<ServiceManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management/assignments",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<ManualAssignment />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management/feedbacks",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<FeedbackManagement />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "management/transactions",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["SUPER_ADMIN"]}>
							<AdminTransactionManagementPage />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "cleaner/jobs",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CLEANER"]}>
							<PersonalJob />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "cleaner/avjobs",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CLEANER"]}>
							<AvailableJobPage />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "cleaner/schedules",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CLEANER"]}>
							<CleanerSchedulePage />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "cleaner/profiles",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CLEANER"]}>
							<CleanerProfile />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "cleaner/feedbacks",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CLEANER"]}>
							<CustomerReviews />
						</RoleRoute>
					</RequireAuth>
				)
			},
			{
				path: "cleaner/incomes",
				element: (
					<RequireAuth>
						<RoleRoute allowedRoles={["CLEANER"]}>
							<IncomePaymentPage />
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
