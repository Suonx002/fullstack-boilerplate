import SidebarWithHeader from './header/private/SidebarWithHeader';
import PublicMainNavigation from './header/public/PublicMainNavigation';

import PrivateMenuRoutes from './header/private/routes/PrivateMenuRoutes';

const IS_LOGGED_IN = true;

const App = () => {
	return (
		<>
			{IS_LOGGED_IN ? (
				<SidebarWithHeader>
					<PrivateMenuRoutes />
				</SidebarWithHeader>
			) : (
				<PublicMainNavigation />
			)}
		</>
	);
};

export default App;
