import React, { useMemo } from 'react';
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	Tfoot,
	Flex,
	Box,
	HStack,
	TableCaption,
	Heading,
	Button,
	Icon,
	Checkbox,
} from '@chakra-ui/react';

import {
	useTable,
	usePagination,
	useGlobalFilter,
	useSortBy,
	useRowSelect,
} from 'react-table';

import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import HEADER_COLUMNS from './HEADER_COLUMNS';
import TABLE_DATA from './TABLE_DATA';
import FilterSearchBar from './FilterSearchBar';

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
		selectedFlatRows,
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
		// adding checkbox columns
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
					Cell: ({ row }) => (
						<Checkbox {...row.getToggleAllRowsSelectedProps} />
					),
				},
			]);
		}
	);

	return (
		<Box bg='whiteAlpha.900' p={8} borderRadius={4}>
			<p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
			<pre>
				<code>
					{JSON.stringify(
						{
							selectedRowIds: selectedRowIds,
							'selectedFlatRows[].original': selectedFlatRows.map(
								(row) => row.original
							),
						},
						null,
						2
					)}
				</code>
			</pre>

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
				<TableCaption>Total Users: {data?.length}</TableCaption>

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
				<Tfoot _fullScreen>
					<Flex p={5}>
						<Box>
							Page {pageIndex + 1} of {pageOptions?.length}
						</Box>
						<Box>
							<Button
								variant='outline'
								onClick={previousPage}
								isDisabled={!canPreviousPage}>
								Previous
							</Button>
							<Button
								variant='outline'
								onClick={nextPage}
								isDisabled={!canNextPage}>
								Next
							</Button>
						</Box>
					</Flex>
				</Tfoot>
			</Table>

			{/* ENDING TABLE */}
		</Box>
	);
};

export default TableList;
