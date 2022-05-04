function PopulateHIChart() {
    let ctx = document.getElementById('healthIndexChart').getContext('2d');

    const labels = [
        '4/21/2022',
        '4/22/2022',
        '4/23/2022',
        '4/24/2022',
        '4/25/2022',
        '4/26/2022',
        '4/27/2022',
        '4/28/2022',
        '4/29/2022',
    ];

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Health Index',
                data: ['SUCCESS', 'SUCCESS', 'FAIL', 'SUCCESS', 'FAIL', 'FAIL', 'SUCCESS', 'FAIL', 'SUCCESS'],
                borderColor: 'rgba(100, 149, 237, 1)',
                fill: false,
                stepped: true,
                yAxisID: 'y',
            },
        ],
    };

    const totalDuration = 10000;
    const delayBetweenPoints = totalDuration / labels.length;
    const previousY = ctx =>
        ctx.index === 0
            ? ctx.chart.scales.y.getPixelForValue('SUCCESS')
            : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
    const animation = {
        y: {
            type: 'boolean',
            easing: 'linear',
            duration: delayBetweenPoints,
            delay(c) {
                if (c.type !== 'data' || c.yStarted) {
                    return 0;
                }
                c.yStarted = true;
                return c.index * delayBetweenPoints;
            },
        },
    };

    let healthIndexChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            animation,
            interaction: {
                intersect: false,
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Health Index',
                },
            },
            scales: {
                y: {
                    type: 'category',
                    labels: ['SUCCESS', 'FAIL'],
                    offset: true,
                    position: 'left',
                },
            },
        },
    });
}

$(document).ready(function () {
    PopulateHIChart();
});
