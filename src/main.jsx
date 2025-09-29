import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import AccountForgetPasswordPage from './pages/account_forget_password.jsx';
import AccountRegistrationPage from './pages/account_register.jsx';
import BookingPage from './pages/booking.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
import WelcomeManagement from './pages/management/welcome_management.jsx';
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
				path: "booking",
				element: <BookingPage />
			},
			{
				path: "forget-password",
				element: <AccountForgetPasswordPage />
			},
			{
				path: "management",
				element: <WelcomeManagement />
			}



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
