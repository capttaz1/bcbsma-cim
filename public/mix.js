function loadMixData() {
    $.ajax({
        url: '/api/mix/all',
        dataType: 'json',
        type: 'GET',
        error: function (xhr, status, error) {
            console.error(xhr.responseText);
        },
        success: function (data) {
            console.log('Data Retrieved Successfully');
            PopulateMixChart(data);
            return false;
        },
    });
}

function PopulateMixChart(data) {
    let dataArray = [];
    $.each(data, function (i, item) {
        dataArray.push({ date: item.date, steps: item.steps, hrv: item.hrv });
    });

    console.log(JSON.stringify(dataArray));
    let ctx = document.getElementById('mixChart').getContext('2d');
    let mixChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.values(dataArray).map(e => e.date),
            datasets: [
                {
                    label: 'Steps',
                    data: Object.values(dataArray).map(e => e.steps),
                    borderColor: 'rgba(0, 0, 0, 0)',
                    backgroundColor: 'rgba(100, 149, 237, 1)',
                    order: 0,
                    yAxisID: 'y',
                },
                {
                    label: 'HRV',
                    data: Object.values(dataArray).map(e => e.hrv),
                    borderColor: 'rgba(0, 0, 0, 0)',
                    backgroundColor: 'rgba(232, 244, 140, 1)',
                    fill: true,
                    type: 'line',
                    order: 1,
                    yAxisID: 'y1',
                },
            ],
        },
        options: {
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                },
            },
        },
    });
}

$(document).ready(function () {
    loadMixData();
});
