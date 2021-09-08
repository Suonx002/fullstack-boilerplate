import LoginPage from '../views/auth/Loginpage';
import RegisterPage from '../views/auth/Registerpage';

const authRoutes = [
	{
		path: '/login',
		component: LoginPage,
	},
	{
		path: '/register',
		component: RegisterPage,
	},
];

export default authRoutes;
