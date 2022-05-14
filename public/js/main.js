const ctx = document.getElementById("myChart").getContext("2d");

// Gradient

let gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, " rgba(77,25,77,1)");

gradient.addColorStop(1, "rgba(21,142,181,1)");

const labels = ["2015", "2016", "2017", "2018", "2019", "2020", "2021"];

const data = {
  labels,
  datasets: [
    {
      data: [150, 250, 450, 700, 550, 250, 10],
      label: "Employees",
      fill: true,
      backgroundColor: gradient,
      tension: 0.4,
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    radius: 5,
    hitRadius: 30,
    hoverRadius: 12,
    responsive: true,
    scales: {
      y: {
        ticks: {
          callback: (value) => {
            return "" + value + "";
          },
        },
      },
    },
  },
};

const myChart = new Chart(ctx, config);
