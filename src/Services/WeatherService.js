import { DateTime } from "luxon";

const API_KEY = "1fa9ff4126d95b8db54f3897a208e91c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";


const GetWeatherData = (InfoType, SearchParams) => {
  const url = new URL(BASE_URL + "/" + InfoType);
  url.search = new URLSearchParams({ ...SearchParams, appid: API_KEY });

  //   console.log(url);
  return fetch(url).then((res) => res.json());
  //  .then((data) => data)
};
const FormatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    weather,
    details,
    icon,
    speed,
  };
};

const FormatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: FormatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: FormatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });
  return { timezone, daily, hourly };
};

const GetFormattedWeatherData = async (SearchParams) => {
  const FormattedCurrentWeather = await GetWeatherData(
    "weather",
    SearchParams
  ).then(FormatCurrentWeather);

  const { lat, lon } = FormattedCurrentWeather;

  const FormattedForecastWeather = await GetWeatherData("onecall", 
  {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: SearchParams.units,
  }).then(FormatForecastWeather);

  return { ...FormattedCurrentWeather, ...FormattedForecastWeather };
};

const FormatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const IconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default GetFormattedWeatherData;

export { FormatToLocalTime, IconUrlFromCode };
