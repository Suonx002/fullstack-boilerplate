import SidebarWithHeader from './header/private/SidebarWithHeader';
import PublicMainNavigation from './header/public/PublicMainNavigation';

const IS_LOGGED_IN = false;

const App = () => {
	return (
		<>
			{IS_LOGGED_IN ? (
				<SidebarWithHeader>login</SidebarWithHeader>
			) : (
				<PublicMainNavigation />
			)}
		</>
	);
};

export default App;
