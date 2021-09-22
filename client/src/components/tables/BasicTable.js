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
} from '@chakra-ui/react';
import { useTable } from 'react-table';

const BasicTable = ({ TABLE_HEADER_COLUMNS, TABLE_DATA_SAMPLES }) => {
	const tableColumns = useMemo(() => TABLE_HEADER_COLUMNS, []);
	const tableDataSamples = useMemo(() => TABLE_DATA_SAMPLES, []);

	const tableSize = useBreakpointValue({
		base: 'sm',
		md: 'md',
	});

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns: tableColumns,
			data: tableDataSamples,
		});

	return (
		<Box bg='whiteAlpha.900' p={8} borderRadius={4}>
			<Heading as='h2' size='lg' isTruncated mb={4}>
				Users (Basic Table)
			</Heading>
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
											<Th {...column.getHeaderProps()} color='whiteAlpha.900'>
												{column.render('Header')}
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
							rows.map((row) => {
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
		</Box>
	);
};

export default BasicTable;
