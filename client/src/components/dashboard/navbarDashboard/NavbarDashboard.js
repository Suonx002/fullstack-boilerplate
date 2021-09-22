import React from 'react';
import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	DrawerOverlay,
	Text,
	useDisclosure,
	Menu,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
	useToast,
	Collapse,
	Stack,
} from '@chakra-ui/react';

import { FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';

import { Link as LinkRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../../redux/actions/auth/authActions';

import LINK_ITEMS from '../LINK_ITEMS';

const NavbarDashboard = ({ children }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const {
		auth: { user },
	} = useSelector((state) => state);

	return (
		<Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement='left'
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size='full'>
				<DrawerOverlay />

				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobile nav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p='4'>
				{children}
			</Box>
		</Box>
	);
};

const SidebarContent = ({ onClose, ...rest }) => {
	return (
		<Box
			transition='3s ease'
			bg={useColorModeValue('white', 'gray.900')}
			borderRight='1px'
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos='fixed'
			h='full'
			{...rest}>
			<Flex h='20' alignItems='center' mx='8' justifyContent='space-between'>
				<Text fontSize='2xl' fontFamily='monospace' fontWeight='bold'>
					Logo
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{LINK_ITEMS.map((item) => (
				<NavItem key={item.label} icon={item.icon} item={item} />
			))}
		</Box>
	);
};

const NavItem = ({ icon, item, ...rest }) => {
	const { isOpen, onToggle } = useDisclosure();

	const {
		auth: { user },
	} = useSelector((state) => state);

	return (
		<Stack
			spacing={4}
			as={LinkRouter}
			to={item?.to || '#'}
			onClick={item?.children && onToggle}>
			<Flex
				align='center'
				p='4'
				mx='4'
				borderRadius='lg'
				role='group'
				cursor='pointer'
				_hover={{
					bg: 'primary.400',
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
				{item.label}{' '}
				{item?.children && (
					<Icon
						ml='auto'
						as={FiChevronDown}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					ml={12}
					mt={2}
					pl={3}
					pr={2}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}
					display='flex'>
					{item?.children?.length > 0 &&
						item?.children.map((child) => (
							<Link
								_hover={{ textDecoration: 'none', color: 'primary.400' }}
								width='100%'
								as={LinkRouter}
								to={child.to}
								key={child.label}
								py={2}
								maxW='100%'>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	const dispatch = useDispatch();
	const toast = useToast();
	const {
		auth: { user },
	} = useSelector((state) => state);

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height='20'
			alignItems='center'
			bg={useColorModeValue('white', 'gray.900')}
			borderBottomWidth='1px'
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant='outline'
				aria-label='open menu'
				icon={<FiMenu />}
			/>

			<Text
				display={{ base: 'flex', md: 'none' }}
				fontSize='2xl'
				fontFamily='monospace'
				fontWeight='bold'>
				Logo
			</Text>

			<HStack spacing={{ base: '0', md: '6' }}>
				<IconButton
					size='lg'
					variant='ghost'
					aria-label='open menu'
					icon={<FiBell />}
				/>
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton
							py={2}
							transition='all 0.3s'
							_focus={{ boxShadow: 'none' }}>
							<HStack>
								<Avatar
									size={'sm'}
									src={
										'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
									}
								/>
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems='flex-start'
									spacing='1px'
									ml='2'>
									<Text fontSize='sm'>
										{user?.firstName || ''} {user?.lastName || ''}
									</Text>
									<Text fontSize='xs' color='gray.600'>
										{user?.role || ''}
									</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue('white', 'gray.900')}
							borderColor={useColorModeValue('gray.200', 'gray.700')}>
							<MenuItem>Profile</MenuItem>
							<MenuItem>Settings</MenuItem>
							<MenuItem>Billing</MenuItem>
							<MenuDivider />
							<MenuItem onClick={() => dispatch(authActions.logoutUser(toast))}>
								Sign out
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};

export default NavbarDashboard;
