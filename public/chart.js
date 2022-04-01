function loadData() {
  $.ajax({
    url: "/api/v1/data/steps",
    dataType: "json",
    type: "GET",
    error: function(xhr, status, error) {
      toastr.error(xhr.responseText);
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
    dataArray[item.date] = item.value;
  });

  console.log(Object.values(dataArray));
  let ctx = document.getElementById("myChart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: Object.keys(dataArray),
      datasets: [
        {
          label: "Steps",
          data: Object.values(dataArray),
          borderColor: "rgba(0, 0, 0, 0)",
          backgroundColor: "rgba(192, 75, 192, 0.5)",
          yAxisID: "steps",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            id: "steps",
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Steps",
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
