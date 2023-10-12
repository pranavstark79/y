
document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('container', {

        title: {
            text: 'U.S Solar Employment Growth',
            align: 'left'
        },

        subtitle: {
            text: 'By Job Category. Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>.',
            align: 'left'
        },

        yAxis: {
            title: {
                text: 'Net Profit/Loss'
            }
        },

        xAxis: {
            accessibility: {
                rangeDescription: 'Range: 2010 to 2020'
            }
        },

        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },

        plotOptions: {
            series: {
                label: {
                    connectorAllowed: false
                },
                pointStart: 2010
            }
        },

        series: [{
            name: 'Trading Profit Loss History',
            data: [
                -1580,
                -1856,
                -2400,
                -2034,
                -2082,
                -2386,
                -2116,
                -2380,
                -2420,
                -2156,
                -2372,
                -2666,
                -2966,
                -2757,
                -2613,
                -2968,
                -2638,
                -2578,
                -3272
            ]
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }

    });
});
