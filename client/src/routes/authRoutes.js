import ForgotPasswordPage from '../views/auth/ForgotPasswordPage';
import LoginPage from '../views/auth/Loginpage';
import RegisterPage from '../views/auth/Registerpage';

const authRoutes = [
	{
		path: '/login',
		component: LoginPage,
		type: 'public',
	},
	{
		path: '/register',
		component: RegisterPage,
		type: 'public',
	},
	{
		path: '/forgot-password',
		component: ForgotPasswordPage,
		type: 'public',
	},
];

export default authRoutes;
