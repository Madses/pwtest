import React, { useEffect } from "react";
import Highcharts from "highcharts";

export default function LineChart({ companies, param, data }) {
    /**
     * Create chart data for this specific chart
     * @param   {Object} data
     * @param   {string} company
     * @param   {string} param
     * @returns {Array}
     */
    const makeData = (data, company, param) => {
        return Object.entries(
            data[company.value][0]["Time Series (Daily)"]
        ).map(entry => [
            Date.parse(entry[0]),
            parseFloat(entry[1][param.value]),
        ]);
    };

    useEffect(() => {
        Highcharts.chart("container", {
            rangeSelector: {
                selected: 1,
            },

            title: {
                text: "Daily prices",
            },

            xAxis: {
                type: "datetime",
                labels: {
                    format: "{value:%Y-%m-%d}",
                },
            },

            series: companies.map(company => {
                return {
                    name: company.label,
                    data: makeData(data, company, param),
                    tooltip: {
                        valueDecimals: 3,
                    },
                };
            }),
        });
    }, [companies, param, data]);

    return <div id="container"></div>;
}
