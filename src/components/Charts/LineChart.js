import React, { useEffect } from "react";
import Highcharts from "highcharts";
import moment from "moment";

export default function LineChart({ companies, param, data }) {
    const makeData = (data, company, param) => {
        return Object.entries(
            data[company.value][0]["Time Series (Daily)"]
        ).map(entry => {
            console.log(entry[1][param.value]);
            return [moment(entry[0]).unix(), parseInt(entry[1][param.value])];
        });
    };

    useEffect(() => {
        Highcharts.chart("container", {
            rangeSelector: {
                selected: 1,
            },

            title: {
                text: "Daily prices",
            },

            xAxis: { type: "datetime" },

            series: companies.map(company => {
                return {
                    name: company.label,
                    data: makeData(data, company, param),
                    tooltip: {
                        valueDecimals: 2,
                    },
                };
            }),
        });
    }, [companies, param, data]);

    return <div id="container"></div>;
}
