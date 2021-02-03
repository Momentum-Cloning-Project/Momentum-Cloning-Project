import { doc } from "prettier";

const weatherHandler = () => {
  const $weatherBtn = document.querySelector('.weather__button');
  const $weatherCity = document.querySelector('.weather__city');
  const $weatherApp = document.querySelector('.weather__app');
  const $weatherCurrCity = document.querySelector('.weather__current-city');
  const $weatherCurrStat = document.querySelector('.weather__stat-number');
  const $appCurrStat = document.querySelector('.app__stat-number');
  const $forecastList = document.querySelector('.forecast__list');

  // ③
  const setWeatherInfos = weatherInfos => {
    console.dir(weatherInfos);
    console.dir(weatherInfos.list);
    console.dir($forecastList.children);
  };

  const setCurrWeatherInfos = currWeatherInfos => {
    $weatherCity.textContent = currWeatherInfos.name;
    $weatherCurrCity.textContent = currWeatherInfos.name;
    $weatherCurrStat.textContent = Math.round(currWeatherInfos.main.temp);
    $appCurrStat.textContent = Math.round(currWeatherInfos.main.temp);
    console.dir(currWeatherInfos);
  };

  // ②
  const getForecast = async (lat, lon) => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a0542651a9f965001a4d891288d5dee2&units=metric`);
    const weatherInfos = await res.json();
    setWeatherInfos(weatherInfos);
  };

  const getCityWeather = async (lat, lon) => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0542651a9f965001a4d891288d5dee2&units=metric`);
    const currWeatherInfos = await res.json();
    setCurrWeatherInfos(currWeatherInfos);
  };

  // ①
  const getCityInfo = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      getForecast(lat, lon);
      getCityWeather(lat, lon);
    });
  };

  document.addEventListener('DOMContentLoaded', getCityInfo);

  // 팝업
  $weatherBtn.onclick = () => {
    if ($weatherApp.classList.contains('active')) {
      $weatherApp.classList.replace('active', 'hide');
    } else $weatherApp.classList.replace('hide', 'active');
  };
};

export default weatherHandler;
