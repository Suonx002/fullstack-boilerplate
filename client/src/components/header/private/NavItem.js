import React from 'react';
import { Flex, Icon, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NavItem = ({ href, icon, children, ...rest }) => {
	return (
		<Link as={RouterLink} to={href} style={{ textDecoration: 'none' }}>
			<Flex
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				_hover={{
					bg: 'blue.400',
					color: 'white',
				}}
				{...rest}>
				{icon && (
					<Icon
						mr='4'
						fontSize='16'
						_groupHover={{
							color: 'white',
						}}
						as={icon}
					/>
				)}

				{children}
			</Flex>
		</Link>
	);
};

export default NavItem;
