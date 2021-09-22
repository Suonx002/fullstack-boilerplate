// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';

// global style overrides
import styles from './styles';

// Foundational style overrides

// Component style overrides

const overrides = {
	...styles,
};

const customTheme = extendTheme(overrides);

export default customTheme;
