import React, { useState, useEffect } from "react";
import DataTable from "./components/DataTable";
import Search from "./components/Search";
import LineChart from "./components/Charts";
import Select from "react-select";
import columns from "./utils/tableColumns";
import { chartData } from "./utils/chartData";
import { makeMultipleRequestsAndCombineResults as fetchUrls } from "./utils/makeMultipleRequestsAndCombineResults";
import "./globalstyle.scss";

function App() {
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState(null);
    const [selectedCompanies, setSelectedCompanies] = useState([]);
    const [param, setParam] = useState([]);

    useEffect(() => {
        const apiUrlsForTable = [
            "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=I0R8K64CG3EHARV6",
            "https://www.alphavantage.co/query?function=OVERVIEW&symbol=MSFT&apikey=I0R8K64CG3EHARV6",
            "https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=I0R8K64CG3EHARV6",
        ];

        fetchUrls(apiUrlsForTable)
            .then(res => setTableData(res))
            .catch(err => console.error(err));
    }, []);

    /**
     *Takes in an event object, then extracts the query and uses it to filter the company field
     * @param {Object} event
     */
    const searchFieldCallback = e => {
        const query = e.target.value;

        if (!query.length) {
            setFilteredData(null);
        }

        setFilteredData(
            tableData.filter(item =>
                item.Name.toUpperCase().includes(query.toUpperCase())
            )
        );
    };

    return (
        <div className="main-container">
            <LineChart
                companies={selectedCompanies}
                param={param}
                data={chartData}
            />
            <div className="options">
                <div>
                    <Select
                        isMulti={true}
                        options={[
                            { label: "IBM", value: "ibm" },
                            { label: "Apple", value: "aapl" },
                            { label: "Microsoft", value: "msft" },
                        ]}
                        onChange={setSelectedCompanies}
                    />
                    <Select
                        options={[
                            { label: "Open", value: "1. open" },
                            { label: "High", value: "2. high" },
                            { label: "Low", value: "3. low" },
                            { label: "Close", value: "4. close" },
                        ]}
                        onChange={setParam}
                    />
                </div>

                <Search
                    onChange={searchFieldCallback}
                    placeholder="Search company name"
                />
            </div>
            <DataTable columns={columns} data={filteredData || tableData} />
        </div>
    );
}

export default App;
