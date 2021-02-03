import { doc } from "prettier";

const weatherHandler = () => {
  const $weatherBtn = document.querySelector('.weather__button');
  const $weatherApp = document.querySelector('.weather__app');

  const setWeatherInfos = weatherInfos => {
    console.dir(weatherInfos);
    // $test.textContent = weatherInfos.city.name;
    // console.dir(weatherInfos.list.);
  };

  const getCityWeather = async (lat, lon) => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a0542651a9f965001a4d891288d5dee2&units=metric`);
    const weatherInfos = await res.json();
    setWeatherInfos(weatherInfos);
  };

  const getCityInfo = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

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
