import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {
	createBrowserRouter,
	RouterProvider,
} from "react-router-dom";
import App from './App.jsx';
import { AuthWrapper } from './components/context/auth.context.jsx';
import HomePage from './pages/home.jsx';
import LoginPage from './pages/login.jsx';
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
			}


			// {
			// 	path: "student",
			// 	element: <StudentPage />
			// },
			// {
			// 	path: "schedule/:name",
			// 	element: <SchedulePage />
			// },

		]
	},
	{
		path: "/login",
		element: <LoginPage />
	},
]);


createRoot(document.getElementById('root')).render(
	<AuthWrapper>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</AuthWrapper>
)
