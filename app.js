const url = "https://api.open-meteo.com/v1/forecast" +
  "?latitude=-31.39&longitude=-58.02" +
  "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum" +
  "&models=ecmwf_ifs025,gfs_seamless,icon_seamless" +
  "&timezone=America/Argentina/Buenos_Aires";

fetch(url)
  .then(r => r.json())
  .then(data => {
    document.getElementById("out").textContent = JSON.stringify(data, null, 2);
  });

const chart = document.getElementById('myChart');
new Chart(chart, {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}