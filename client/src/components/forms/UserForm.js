import React from 'react';

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	Box,
	Stack,
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
} from '@chakra-ui/react';

import { Formik, Field, Form } from 'formik';

const UserForm = ({
	heading,
	// formik data
	initialValues,
	dataSchema,
	dataFieldsArray,
	onSubmit,
	// modal states
	onClose,
	isOpen,
}) => {
	console.log({
		heading,
		// formik data
		initialValues,
		dataSchema,
		dataFieldsArray,
		onSubmit,
		// modal states
		onClose,
		isOpen,
	});
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<Formik validationSchema={dataSchema} initialValues={initialValues}>
				{({ values, isSubmitting }) => {
					<Form>
						<ModalContent>
							<ModalHeader>{heading}</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Box rounded={'lg'} bg={'white'} boxShadow={'lg'} p={8}>
									<Stack spacing={4} minW={{ base: 'auto', sm: 350 }}>
										{dataFieldsArray?.length > 0 &&
											dataFieldsArray.map((item) => (
												<Field name={item.name} key={item.name}>
													{({ field, form }) => (
														<FormControl
															isInvalid={
																form.errors[item.name] &&
																form.touched[item.name]
															}>
															<FormLabel htmlFor={item.name}>
																{item.label}
															</FormLabel>
															<Input
																{...field}
																id={item.name}
																type={item?.type}
																value={values[item.name]}
															/>
															<FormErrorMessage>
																{form.errors[item.name]}
															</FormErrorMessage>
														</FormControl>
													)}
												</Field>
											))}
									</Stack>
								</Box>
							</ModalBody>

							<ModalFooter>
								<Button colorScheme='gray' mr={3} onClick={onClose}>
									Close
								</Button>
								<Button
									type='submit'
									Button
									isLoading={isSubmitting}
									bg={'primary.400'}
									color={'white'}
									_hover={{
										bg: 'primary.500',
									}}
									onClick={onClose}>
									Save
								</Button>
							</ModalFooter>
						</ModalContent>
					</Form>;
				}}
			</Formik>
		</Modal>
	);
};

export default UserForm;
