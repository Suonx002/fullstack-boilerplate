import React, { useMemo } from 'react';
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
} from '@chakra-ui/react';

import {
	useTable,
	usePagination,
	useGlobalFilter,
	useSortBy,
	useRowSelect,
} from 'react-table';

import {
	FiChevronDown,
	FiChevronUp,
	FiEdit,
	FiX,
	FiMail,
} from 'react-icons/fi';

import HEADER_COLUMNS from './HEADER_COLUMNS';
import TABLE_DATA from './TABLE_DATA';
import FilterSearchBar from './FilterSearchBar';
import MenuDropdown from './MenuDropdown';

const TableList = () => {
	const columns = useMemo(() => HEADER_COLUMNS, []);
	const data = useMemo(() => TABLE_DATA, []);

	const {
		// starter
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		// state for table
		state: { pageIndex, globalFilter, selectedRowIds },
		// filter
		setGlobalFilter,

		// paginations
		page,

		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		pageOptions,
		// selected row
	} = useTable(
		{
			columns,
			data,
			initialState: {
				pageSize: 20,
				sortBy: [{ id: 'id', desc: false }],
			},
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		// custom hooks to add column for action btns
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				...columns,
				{
					id: 'selections',
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<Th color='whiteAlpha.900' border='none'>
							Actions
						</Th>
					),
					Cell: ({ row }) => {
						return (
							<HStack>
								<Tooltip label='Edit'>
									<IconButton
										variant='outline'
										size='sm'
										onClick={() => {
											console.log({
												row: row?.values,
											});
										}}>
										<FiEdit fontSize={{ base: 14, md: 16 }} />
									</IconButton>
								</Tooltip>
								<Tooltip label='Email'>
									<IconButton
										variant='outline'
										size='sm'
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
			<Heading as='h2' size='lg' isTruncated>
				Users
			</Heading>
			<FilterSearchBar filter={globalFilter} setFilter={setGlobalFilter} />

			{/* STARTING TABLE */}
			<Table
				{...getTableProps()}
				bg='whiteAlpha.900'
				size='lg'
				// variant='striped'
				borderColor='gray.100'
				borderWidth={1}
				borderRadius={4}>
				<Thead bg='blue.400'>
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
											{...column.getHeaderProps(column.getSortByToggleProps())}
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
															<Icon fontSize={{ base: 16, md: 20, lg: 25 }}>
																<FiChevronUp />
															</Icon>
														) : (
															<Icon fontSize={{ base: 16, md: 20, lg: 25 }}>
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
			<Flex justify='space-between' align='center' p={5}>
				<HStack>
					<Text fontSize='lg' mr={3}>
						Total: {data?.length}
					</Text>
				</HStack>
				<HStack>
					<Text fontSize='lg'> Rows per page</Text>
					<MenuDropdown />
				</HStack>

				<HStack>
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

			{/* ENDING TABLE */}
		</Box>
	);
};

export default TableList;
