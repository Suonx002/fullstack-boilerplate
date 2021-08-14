const tableDefaultColumns = (table) => {
	const currentDate = new Date().toDateString();

	table.timestamp('createdAt').defaultTo(currentDate);
	table.timestamp('updatedAt').defaultTo(currentDate);
};

module.exports = tableDefaultColumns;
