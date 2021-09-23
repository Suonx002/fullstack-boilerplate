import React from 'react';

import { Box, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

const Profile = () => {
	return (
		<Box bg='white' minH='100vh' p={8} borderRadius={4}>
			<Tabs display='flex' variant='line' borderBottom='none'>
				<TabList display='flex' flexDirection='column' minw={200}>
					<Tab>One</Tab>
					<Tab>Two</Tab>
					<Tab>Information</Tab>
				</TabList>

				<TabPanels>
					<TabPanel>
						<p>one!</p>
					</TabPanel>
					<TabPanel>
						<p>two!</p>
					</TabPanel>
					<TabPanel>
						<p>three!</p>
					</TabPanel>
				</TabPanels>
			</Tabs>
		</Box>
	);
};

export default Profile;
