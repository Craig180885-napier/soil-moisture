

chartIt();

async function chartIt() {
  const data = await getData();
  const avocadoThreshold = "250";
  const ctx = document.getElementById("chart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.xDatePublished,
      datasets: [
        {
          label: "Soil Moisture %",
          data: data.yMoistureReading,
          fill: false,
          lineTension: 0.4,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },

        {
          label: "Avocado Threshold",
          data: [90, 90, 90, 90],
          fill: false,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value + "%";
            },
          },
        },
      },
    },
  });
}

// getData();
async function getData() {
  const xDatePublished = [];
  const yMoistureReading = [];

  const response = await fetch("/soil");
  const data = await response.json();
  var num1 = 0;
  console.log("array : ", data);
  for (var i in data.result) {
    // console.log(
    //   "moisture : ",
    //   data.result[num1].data + "\n",
    //   "date_time : ",
    //   data.result[num1].published_at,
    //   "\n"
    // ),

    xDatePublished.unshift(data.result[num1].published_at);
    yMoistureReading.push(data.result[num1].data);

    num1++;
  }
  return { xDatePublished, yMoistureReading };
}
