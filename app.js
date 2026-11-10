const url = "https://api.open-meteo.com/v1/forecast" +
  "?latitude=-31.39&longitude=-58.02" +
  "&daily=temperature_2m_max,temperature_2m_min,precipitation_sum" +
  "&models=ecmwf_ifs025,gfs_seamless,icon_seamless" +
  "&timezone=America/Argentina/Buenos_Aires";

const week_url = "https://api.open-meteo.com/v1/forecast" +
  "?latitude=-31.30223" +
  "&longitude=-58.00147" +
  "&models=ecmwf_aifs025_single" +
  "&daily=temperature_2m_max," +
  "temperature_2m_min," +
  "apparent_temperature_max," +
  "apparent_temperature_min," +
  "wind_direction_10m_dominant," +
  "precipitation_hours," +
  "precipitation_probability_max," +
  "precipitation_sum," +
  "relative_humidity_2m_mean"+
  "&timezone=America/Argentina/Buenos_Aires" +
  "&forecast_days=7";
  
const week_wind_url = "https://api.open-meteo.com/v1/forecast?" +
  "latitude=-31.30223" +
  "&longitude=-58.00147" +
  "&models=icon_global" +
  "&daily=wind_speed_10m_max,"+
  "wind_gusts_10m_max," +
  "surface_pressure_mean," +
  "cloud_cover_mean," +
  "wind_direction_10m_dominant" +
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
  "&hourly=wind_speed_10m,wind_gusts_10m,surface_pressure,wind_direction_80m,cloud_cover" +
  "&timezone=America/Argentina/Buenos_Aires" +
  "&forecast_days=1" +
  "&wind_speed_unit=kmh";

const getJson = url => fetch(url)
  .then(r => r.json())
  .then(data => { if (data.error) throw new Error(data.reason); return data; });


const week_json = getJson(week_url);
const week_wind_json = getJson(week_wind_url);

const windArrow = deg =>
  `<span style="display:inline-block;transform:rotate(${(deg + 180) % 360}deg)" ` +
  `title="${deg}°">↑</span>`;

const rainText = (sum, hours, prob) => {
  if (prob == null) {
    return "0%"
  }
  if (prob>10) {
    return `${prob} - ${hours}h · ${sum}mm`
  }
  return `${prob}`
};

const formatDayName = (date) =>
  new Date(date).toLocaleDateString("es-AR", {
    weekday: "short",
    day: "numeric",
    timeZone: "UTC",
  });

function add_card(day, cover, temp, rain, wind, humidity, pressure, container_id, id) {
  let card = document.createElement("div");
  card.classList.add("weather-card")
  if (id) {
    card.setAttribute('id', id);
  }
  card.innerHTML = `<div class="head">${day}</div>
            <img src="${cover}.png" class="img-cover">
            <p class="card-text temp">${temp}</p>
            <p class="card-text rain">${rain}</p>
            <p class="card-text wind">${wind}</p>
            <p class="card-text humidity">${humidity}</p>
            <p class="card-text pressure">${pressure}</p>`;

  document.getElementById(container_id).appendChild(card)
}

function populate_week() {
  return Promise.all([week_json, week_wind_json])
    .then(([week, wind]) => {
      const w = week.daily, g = wind.daily;

      w.time.forEach((date, i) => {
        add_card(
          `${formatDayName(w.time[i])}`,
          "placeholder",
          `${w.temperature_2m_min[i]}°C/${w.temperature_2m_max[i]}°C`,
          rainText(
            w.precipitation_sum[i],
            w.precipitation_hours[i],
            w.precipitation_probability_max[i]
          ),
          `${windArrow(g.wind_direction_10m_dominant[i])} ` +
          `${g.wind_speed_10m_max[i]} km/h<br>${g.wind_gusts_10m_max[i]} km/h`,
          `${w.relative_humidity_2m_mean?.[i] ?? "–"}%`,
          `${g.surface_pressure_mean[i]} hPa`,
          "week-container",
          `week-card-${date}`
        );
      });
    })
    .catch(err => console.error(err));
}

populate_week()

/*
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
*/

//if ("serviceWorker" in navigator) {
//    navigator.serviceWorker.register("sw.js");
//}