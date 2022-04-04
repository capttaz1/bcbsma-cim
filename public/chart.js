function loadData() {
  $.ajax({
    url: "/api/v1/data/chart",
    dataType: "json",
    type: "GET",
    error: function(xhr, status, error) {
      console.error(xhr.responseText);
    },
    success: function(data) {
      console.log("Data Retrieved Successfully");
      PopulateChart(data);
      return false;
    },
  });
}

function PopulateChart(data) {
  let dataArray = [];
  $.each(data, function(i, item) {
    dataArray[item.date] = { steps: item.steps, hrv: item.hrv };
  });

  console.log(Object.values(dataArray));
  let ctx = document.getElementById("myChart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: Object.keys(dataArray),
      datasets: [
        {
          type: "bar",
          label: "Steps",
          data: Object.values(dataArray).map((e) => e.steps),
          borderColor: "rgba(0, 0, 0, 0)",
          backgroundColor: "rgba(192, 75, 192, 0.5)",
          yAxisID: "steps",
        },
        {
          type: "line",
          label: "Stress",
          data: Object.values(dataArray).map((e) => e.hrv),
          yAxisID: "hrv",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            id: "steps",
            position: "left",
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Steps",
            },
          },
          {
            id: "hrv",
            position: "right",
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Stress",
            },
          },
        ],
      },
    },
  });
}

$("#renderBtn").click(function() {
  console.log("Loading Data");
  loadData();
});
