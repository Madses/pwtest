import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "./components/DataTable";
import columns from "./utils/tableColumns";
import "./globalstyle.scss";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const requests = [
            axios.get(
                "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=I0R8K64CG3EHARV6"
            ),

            axios.get(
                "https://www.alphavantage.co/query?function=OVERVIEW&symbol=MSFT&apikey=I0R8K64CG3EHARV6"
            ),

            axios.get(
                "https://www.alphavantage.co/query?function=OVERVIEW&symbol=AAPL&apikey=I0R8K64CG3EHARV6"
            ),
        ];

        axios
            .all(requests)
            .then(responses =>
                setData(responses.map(response => response.data))
            )
            .catch(err => {
                console.error(err);
            });
    }, []);

    const handleChange = e => {
        const a = data.filter(company => company.Name.includes(e.target.value));
        console.log(a);
    };

    console.log(data);

    return (
        <div className="mainContainer">
            <input type="text" onChange={handleChange}></input>
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default App;
