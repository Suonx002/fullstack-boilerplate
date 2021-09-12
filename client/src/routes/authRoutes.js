import LoginPage from '../views/auth/Loginpage';
import RegisterPage from '../views/auth/Registerpage';
import ForgotPasswordPage from '../views/auth/ForgotPasswordPage';
import ResetPasswordPage from '../views/auth/ResetPasswordPage';

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
		path: '/forgotPassword',
		component: ForgotPasswordPage,
		type: 'public',
	},
	{
		path: '/resetPassword/:token',
		component: ResetPasswordPage,
		type: 'public',
	},
];

export default authRoutes;
