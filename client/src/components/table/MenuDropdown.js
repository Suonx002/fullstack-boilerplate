import React from 'react';

import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	MenuItemOption,
	MenuGroup,
	MenuOptionGroup,
	MenuIcon,
	MenuCommand,
	MenuDivider,
	Button,
} from '@chakra-ui/react';

import {
	FiChevronDown,
	FiChevronUp,
	FiEdit,
	FiX,
	FiMail,
} from 'react-icons/fi';

const MenuDropdown = () => {
	return (
		<Menu>
			<MenuButton
				bg='white'
				_hover='white'
				_active='white'
				as={Button}
				rightIcon={<FiChevronDown />}>
				10
			</MenuButton>
			<MenuList>
				<MenuItem>20</MenuItem>
				<MenuItem>30</MenuItem>
				<MenuItem>50</MenuItem>
				<MenuItem>100</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default MenuDropdown;
