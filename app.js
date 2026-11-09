const url = "https://api.open-meteo.com/v1/forecast" +
  "?latitude=-31.39&longitude=-58.02" +
  "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum" +
  "&models=ecmwf_ifs025,gfs_seamless,icon_seamless" +
  "&timezone=America/Argentina/Buenos_Aires";

const week_url = "https://api.open-meteo.com/v1/forecast" +
  "?latitude=-31.30223" +
  "&longitude=-58.00147" +
  "&models=ecmwf_aifs025_single" +
  "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,surface_pressure_mean,pressure_msl_mean,cloud_cover_mean" +
  "&hourly=relative_humidity_2m" +
  "&timezone=America/Argentina/Buenos_Aires" +
  "&forecast_days=7";
const week_wind_url = "https://api.open-meteo.com/v1/forecast?latitude=-31.30223" +
  "&longitude=-58.00147" +
  "&models=icon_global" +
  "&daily=wind_speed_10m_max,wind_gusts_10m_max,surface_pressure_mean,pressure_msl_mean,cloud_cover_mean" +
  "&timezone=America/Argentina/Buenos_Aires" +
  "&forecast_days=7" +
  "&wind_speed_unit=kmh";

const hourly_url = "https://api.open-meteo.com/v1/forecast?latitude=-31.30223" +
  "&longitude=-58.00147" +
  "&models=ecmwf_aifs025_single" +
  "&hourly=temperature_2m,relative_humidity_2m,precipitation,surface_pressure,pressure_msl,cloud_cover" +
  "&timezone=America/Argentina/Buenos_Aires" +
  "&forecast_days=1";
const houly_wind_url =  "https://api.open-meteo.com/v1/forecast?latitude=-31.30223" +
  "&longitude=-58.00147" +
  "&models=icon_global" +
  "&hourly=wind_speed_10m,wind_gusts_10m,surface_pressure,pressure_msl,cloud_cover" +
  "&timezone=America/Argentina/Buenos_Aires" +
  "&forecast_days=1" +
  "&wind_speed_unit=kmh";

fetch(hourly_url)
  .then(r => r.json())
  .then(data => {
    document.getElementById("out").textContent = JSON.stringify(data, null, 2);
  });

const chart = document.getElementById('testChart');
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