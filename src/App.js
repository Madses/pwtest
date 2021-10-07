import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "./components/DataTable";
import columns from "./utils/tableColumns";
import "./globalstyle.scss";

function App() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get(
                "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=I0R8K64CG3EHARV6"
            )
            .then(res => {
                setData([res.data]);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="mainContainer">
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default App;
