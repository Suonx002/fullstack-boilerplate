import React, { useMemo, useState, useEffect } from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Tfoot,
	Text,
	Flex,
	Box,
	HStack,
	TableCaption,
	Heading,
	Button,
	Icon,
	IconButton,
	Tooltip,
	useBreakpointValue,
	Select,
	useDisclosure,
} from '@chakra-ui/react';

import {
	FiChevronDown,
	FiChevronUp,
	FiEdit,
	FiX,
	FiMail,
} from 'react-icons/fi';

import {
	useTable,
	usePagination,
	useSortBy,
	useGlobalFilter,
	useRowSelect,
} from 'react-table';

import FilterSearchBar from './FilterSearchBar';
import EditUserTableForm from './EditUserTableForm';

const AdvanceTable = ({ TABLE_HEADER_COLUMNS, TABLE_DATA_SAMPLES }) => {
	const tableColumns = useMemo(() => TABLE_HEADER_COLUMNS, []);
	const tableDataSamples = useMemo(() => TABLE_DATA_SAMPLES, []);

	const tableSize = useBreakpointValue({
		base: 'sm',
		md: 'md',
	});

	const {
		state: { pageIndex, pageSize, globalFilter, selectedRowIds },

		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		// rows,

		// select rows
		selectedFlatRows,

		// filter
		setGlobalFilter,

		// paginations
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,

		nextPage,
		previousPage,
		setPageSize,
	} = useTable(
		{
			initialState: { sortBy: [{ id: 'id', desc: false }] },
			columns: tableColumns,
			data: tableDataSamples,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		// custom hooks to add column for action btns
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				// Let's make a column for selection
				{
					id: 'selection',
					// The header can use the table's getToggleAllRowsSelectedProps method
					// to render a checkbox
					Header: ({ getToggleAllPageRowsSelectedProps }) => (
						<div>
							<IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
						</div>
					),
					// The cell can use the individual row's getToggleRowSelectedProps method
					// to the render a checkbox
					Cell: ({ row }) => (
						<div>
							<IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
						</div>
					),
				},
				...columns,
				{
					id: 'actions',
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<Th color='whiteAlpha.900' border='none'>
							Actions
						</Th>
					),
					Cell: ({ row }) => {
						const { isOpen, onOpen, onClose } = useDisclosure();

						return (
							<HStack>
								<EditUserTableForm
									heading='Edit User'
									isOpen={isOpen}
									onClose={onClose}
									currentUserData={row?.values || ''}
								/>
								<Tooltip label='Edit'>
									<IconButton
										variant='outline'
										size='sm'
										onClick={() => {
											// setCurrentUserData((prevState) => {
											// 	return { ...prevState, ...row?.values };
											// });
											onOpen();
										}}>
										<FiEdit fontSize={{ base: 14, md: 16 }} />
									</IconButton>
								</Tooltip>
								<Tooltip label='Email'>
									<IconButton
										variant='outline'
										size={useBreakpointValue({})}
										onClick={() => {
											window.open(
												`mailto:${row?.values?.email || ''}?subject=${
													row?.values?.fullName || ''
												}`,
												'_blank'
											);

											console.log({
												row: row?.values,
											});
										}}>
										<FiMail fontSize={{ base: 14, md: 16 }} />
									</IconButton>
								</Tooltip>
								<Tooltip label='Delete'>
									<IconButton
										size='sm'
										variant='outline'
										onClick={() => {
											console.log({
												row: row?.values,
											});
										}}>
										<FiX fontSize={{ base: 14, md: 16 }} />
									</IconButton>
								</Tooltip>
							</HStack>
						);
					},
				},
			]);
		}
	);

	return (
		<Box bg='whiteAlpha.900' p={8} borderRadius={4}>
			<Heading as='h2' size='lg' isTruncated mb={4}>
				Users
			</Heading>

			{/* filter search bar*/}

			<FilterSearchBar filter={globalFilter} setFilter={setGlobalFilter} />

			{/* <pre>
				<code>
					{JSON.stringify(
						{
							pageIndex,
							pageSize,
							pageCount,
							canNextPage,
							canPreviousPage,
						},
						null,
						2
					)}
				</code>
			</pre>

			<pre>
				<code>
					{JSON.stringify(
						{
							selectedRowIds: selectedRowIds,
							'selectedFlatRows[].original': selectedFlatRows.map(
								(d) => d.original
							),
						},
						null,
						2
					)}
				</code>
			</pre> */}

			{/* STARTING TABLE */}
			<Flex overflowX='auto'>
				<Table
					_fullScreen
					maxW='100%'
					{...getTableProps()}
					bg='whiteAlpha.900'
					size={tableSize}
					// variant='striped'
					borderColor='gray.100'
					borderWidth={1}
					borderRadius={4}>
					<Thead bg='primary.400'>
						{
							// Loop over the header rows
							headerGroups.map((headerGroup) => (
								// Apply the header row props
								<Tr {...headerGroup.getHeaderGroupProps()}>
									{
										// Loop over the headers in each row
										headerGroup.headers.map((column) => (
											// Apply the header cell props
											<Th
												{...column.getHeaderProps(
													column.getSortByToggleProps()
												)}
												color='whiteAlpha.900'>
												<Flex justify='space-between' align='center'>
													<Box>
														{
															// Render the header
															column.render('Header')
														}
													</Box>
													<Box>
														{column?.isSorted ? (
															column?.isSortedDesc ? (
																<Icon fontSize={{ base: 12, md: 16, lg: 20 }}>
																	<FiChevronUp />
																</Icon>
															) : (
																<Icon fontSize={{ base: 12, md: 16, lg: 20 }}>
																	<FiChevronDown />
																</Icon>
															)
														) : (
															''
														)}
													</Box>
												</Flex>
											</Th>
										))
									}
								</Tr>
							))
						}
					</Thead>
					{/* Apply the table body props */}
					<Tbody {...getTableBodyProps()}>
						{
							// Loop over the table rows
							page.map((row) => {
								// Prepare the row for display
								prepareRow(row);
								return (
									// Apply the row props
									<Tr {...row.getRowProps()}>
										{
											// Loop over the rows cells
											row.cells.map((cell) => {
												// Apply the cell props
												return (
													<Td {...cell.getCellProps()}>
														{
															// Render the cell contents
															cell.render('Cell')
														}
													</Td>
												);
											})
										}
									</Tr>
								);
							})
						}
					</Tbody>
				</Table>
			</Flex>

			<Flex
				direction={{ base: 'column', md: 'row' }}
				justify='space-between'
				align='center'
				p={5}>
				<HStack mb={{ base: 4, md: 6 }}>
					<Text fontSize='lg' mr={3}>
						Total: {tableDataSamples?.length}
					</Text>
				</HStack>
				<Flex align='center' mb={{ base: 4, md: 6 }}>
					<Text fontSize='md' minW='125px'>
						{' '}
						Rows per page
					</Text>
					<Select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}>
						{[10, 20, 50, 100].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</Select>
				</Flex>

				<HStack mb={{ base: 4, md: 6 }}>
					<Button
						variant='outline'
						onClick={previousPage}
						isDisabled={!canPreviousPage}>
						Previous
					</Button>
					<Box>
						{pageIndex + 1} of {pageOptions?.length}
					</Box>
					<Button
						variant='outline'
						onClick={nextPage}
						isDisabled={!canNextPage}>
						Next
					</Button>
				</HStack>
			</Flex>
		</Box>
	);
};

const IndeterminateCheckbox = React.forwardRef(
	({ indeterminate, ...rest }, ref) => {
		const defaultRef = React.useRef();
		const resolvedRef = ref || defaultRef;

		React.useEffect(() => {
			resolvedRef.current.indeterminate = indeterminate;
		}, [resolvedRef, indeterminate]);

		// NEED TO USE REGULAR CHECKBOX IN ORDER FOR SELECT ALL TO WORK

		return (
			<>
				<input type='checkbox' ref={resolvedRef} {...rest} />
			</>
		);
	}
);

export default AdvanceTable;
