/**
 * In utils gezet om App.js klein en clean te houden. Stel je voor dat dit een applicatie was met meerdere tabellen, dan kunnen alle kolommen  mooi in een gezamenlijke overzicht.
 */
const columns = [
    {
        Header: "Name",
        accessor: "Name",
    },
    {
        Header: "Description",
        accessor: "Description",
    },

    {
        Header: "Address",
        accessor: "Address",
    },

    {
        Header: "Dividend Yield",
        accessor: "DividendYield",
    },
    {
        Header: "Market Capitalization",
        accessor: "MarketCapitalization",
    },
];

export default columns;
