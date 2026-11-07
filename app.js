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


if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}