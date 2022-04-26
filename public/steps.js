function loadData() {
    $.ajax({
        url: '/api/steps/all',
        dataType: 'json',
        type: 'GET',
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        },
        success: function (data) {
            console.log('Data Retrieved Successfully');
            PopulateChart(data);
            return false;
        },
    });
}

function PopulateChart(data) {
    let dataArray = {};
    $.each(data, function (i, item) {
        dataArray[item.date] = { steps: item.value };
    });

    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Object.keys(dataArray),
            datasets: [
                {
                    label: 'Steps',
                    data: Object.values(dataArray).map(e => e.steps),
                    borderColor: 'rgba(0, 0, 0, 0)',
                    backgroundColor: 'rgba(100, 149, 237, 1)',
                    yAxisID: 'steps',
                },
            ],
        },
        options: {
            scales: {
                yAxes: [
                    {
                        id: 'steps',
                        ticks: {
                            beginAtZero: true,
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Steps',
                        },
                    },
                ],
            },
        },
    });
}

$('#renderBtn').click(function () {
    console.log('Loading Data');
    loadData();
});
