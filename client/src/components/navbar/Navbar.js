import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	Link,
	useToast,
} from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';

// import {
// 	HamburgerIcon,
// 	CloseIcon,
// 	ChevronDownIcon,
// 	ChevronRightIcon,
// } from '@chakra-ui/icons';

import {
	FiMenu as HamburgerIcon,
	FiX as CloseIcon,
	FiChevronDown as ChevronDownIcon,
	FiChevronRight as ChevronRightIcon,
} from 'react-icons/fi';

import { useDispatch, useSelector } from 'react-redux';

import * as authActions from '../../redux/actions/auth/authActions';

export default function Navbar() {
	const { isOpen, onToggle } = useDisclosure();
	const toast = useToast();

	const dispatch = useDispatch();
	const {
		auth: { user },
	} = useSelector((state) => state);

	return (
		<Box>
			<Flex
				bg={useColorModeValue('white', 'gray.800')}
				color={useColorModeValue('gray.600', 'white')}
				minH={'60px'}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={'solid'}
				borderColor={useColorModeValue('gray.200', 'gray.900')}
				align={'center'}>
				<Flex
					flex={{ base: 1, md: 'auto' }}
					ml={{ base: -2 }}
					display={{ base: 'flex', md: 'none' }}>
					<IconButton
						onClick={onToggle}
						icon={
							isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
						}
						variant={'ghost'}
						aria-label={'Toggle Navigation'}
					/>
				</Flex>
				<Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
					<Link as={LinkRouter} to='/' _hover={{ textDecoration: 'none' }}>
						<Text
							textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
							fontFamily={'heading'}
							color={useColorModeValue('gray.800', 'white')}>
							Logo
						</Text>
					</Link>

					<Flex display={{ base: 'none', md: 'flex' }} ml={10}>
						<DesktopNav />
					</Flex>
				</Flex>

				{user ? (
					<Stack
						flex={{ base: 1, md: 0 }}
						justify={'flex-end'}
						direction={'row'}
						spacing={6}>
						<Button
							as={'a'}
							onClick={() => dispatch(authActions.logoutUser(toast))}
							display={{ base: 'inline-flex' }}
							fontSize={'sm'}
							fontWeight={600}
							color={'white'}
							bg={'primary.400'}
							_hover={{
								bg: 'primary.300',
							}}>
							Logout
						</Button>
					</Stack>
				) : (
					<Stack
						flex={{ base: 1, md: 0 }}
						justify={'flex-end'}
						direction={'row'}
						spacing={6}>
						<Button
							as={LinkRouter}
							to='/login'
							fontSize={'sm'}
							fontWeight={400}
							variant={'link'}>
							Sign In
						</Button>
						<Button
							as={LinkRouter}
							to='/register'
							display={{ base: 'none', md: 'inline-flex' }}
							fontSize={'sm'}
							fontWeight={600}
							color={'white'}
							bg={'primary.400'}
							_hover={{
								bg: 'primary.300',
							}}>
							Sign Up
						</Button>
					</Stack>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity>
				<MobileNav menuClose={onToggle} />
			</Collapse>
		</Box>
	);
}

const DesktopNav = () => {
	const linkColor = useColorModeValue('gray.600', 'gray.200');
	const linkHoverColor = useColorModeValue('gray.800', 'white');
	const popoverContentBgColor = useColorModeValue('white', 'gray.800');

	return (
		<Stack direction={'row'} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={'hover'} placement={'bottom-start'}>
						<PopoverTrigger>
							<Link
								as={LinkRouter}
								p={2}
								to={navItem.to ?? '#'}
								fontSize={'sm'}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: 'none',
									color: linkHoverColor,
								}}>
								{navItem.label}
							</Link>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={'xl'}
								bg={popoverContentBgColor}
								p={4}
								rounded={'xl'}
								minW={'sm'}>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, to, subLabel }) => {
	return (
		<Link
			as={LinkRouter}
			to={to}
			role={'group'}
			display={'block'}
			p={2}
			rounded={'md'}
			_hover={{ bg: useColorModeValue('primary.50', 'gray.900') }}>
			<Stack direction={'row'} align={'center'}>
				<Box>
					<Text
						transition={'all .3s ease'}
						_groupHover={{ color: 'primary.400' }}
						fontWeight={500}>
						{label}
					</Text>
					<Text fontSize={'sm'}>{subLabel}</Text>
				</Box>
				<Flex
					transition={'all .3s ease'}
					transform={'translateX(-10px)'}
					opacity={0}
					_groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
					justify={'flex-end'}
					align={'center'}
					flex={1}>
					<Icon color={'primary.400'} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</Link>
	);
};

const MobileNav = ({ menuClose }) => {
	const {
		auth: { user },
	} = useSelector((state) => state);
	return (
		<Stack
			bg={useColorModeValue('white', 'gray.800')}
			boxShadow='sm'
			p={4}
			display={{ md: 'none' }}>
			{NAV_ITEMS.map((navItem) => (
				<MobileNavItem key={navItem.label} {...navItem} menuClose={menuClose} />
			))}
			{user
				? AUTHENTICATED_NAV_ITEMS_MOBILE_ONLY.map((navItem) => (
						<MobileNavItem
							key={navItem.label}
							{...navItem}
							menuClose={menuClose}
						/>
				  ))
				: PUBLIC_NAV_ITEMS_MOBILE_ONLY.map((navItem) => (
						<MobileNavItem
							key={navItem.label}
							{...navItem}
							menuClose={menuClose}
						/>
				  ))}
		</Stack>
	);
};

const MobileNavItem = ({ label, children, to, menuClose }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack spacing={4} onClick={children && onToggle}>
			<Flex
				onClick={!children && menuClose}
				py={2}
				as={LinkRouter}
				to={to ?? '#'}
				justify={'space-between'}
				align={'center'}
				_hover={{
					textDecoration: 'none',
				}}>
				<Text
					fontWeight={600}
					color={useColorModeValue('gray.600', 'gray.200')}>
					{label}
				</Text>
				{children && (
					<Icon
						as={ChevronDownIcon}
						transition={'all .25s ease-in-out'}
						transform={isOpen ? 'rotate(180deg)' : ''}
						w={6}
						h={6}
					/>
				)}
			</Flex>

			<Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
				<Stack
					mt={2}
					pl={4}
					borderLeft={1}
					borderStyle={'solid'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
					align={'start'}>
					{children &&
						children.map((child) => (
							<Link
								onClick={menuClose}
								as={LinkRouter}
								key={child.label}
								py={2}
								to={child.to}>
								{child.label}
							</Link>
						))}
				</Stack>
			</Collapse>
		</Stack>
	);
};

const NAV_ITEMS = [
	{
		label: 'Dashboard',
		to: '/dashboard',
		// children: [
		// 	{
		// 		label: 'Login Page',
		// 		subLabel: 'Login page sample',
		// 		to: '/login',
		// 	},
		// 	{
		// 		label: 'Register Page',
		// 		subLabel: 'Register page sample',
		// 		to: '/register',
		// 	},
		// ],
	},
];

const PUBLIC_NAV_ITEMS_MOBILE_ONLY = [
	{
		label: 'Sign In',
		to: '/login',
	},
	{
		label: 'Sign Up',
		to: '/register',
	},
];

const AUTHENTICATED_NAV_ITEMS_MOBILE_ONLY = [
	{
		label: 'Logout',
		to: '#',
	},
];
