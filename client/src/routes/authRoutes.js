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
];

export default authRoutes;
