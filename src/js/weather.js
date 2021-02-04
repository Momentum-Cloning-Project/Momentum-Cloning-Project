import { doc } from "prettier";

const weatherHandler = () => {
  const $weatherBtn = document.querySelector('.weather__button');
  const $weatherBtnIcon = document.querySelector('.weather__button-icon > img');
  const $weatherCity = document.querySelector('.weather__city');
  const $weatherApp = document.querySelector('.weather__app');
  const $weatherCurrCity = document.querySelector('.weather__current-city');
  const $weatherCondition = document.querySelector('.weather__condition');
  const $weatherCurrStat = document.querySelector('.weather__stat-number');
  const $appCurrStat = document.querySelector('.app__stat-number');
  const $forecastList = document.querySelector('.forecast__list');

  // ③
  const setWeatherInfos = weatherInfos => {
    console.dir(weatherInfos);
    console.dir(weatherInfos.list);
  };

  const setCurrWeatherInfos = currWeatherInfos => {
    $weatherCity.textContent = currWeatherInfos.name;
    $weatherCurrCity.textContent = currWeatherInfos.name;
    $weatherCondition.textContent = currWeatherInfos.weather[0].description;
    $weatherCurrStat.textContent = Math.round(currWeatherInfos.main.temp);
    $appCurrStat.textContent = Math.round(currWeatherInfos.main.temp);
    console.dir(currWeatherInfos);
  };

  const setWeatherIcons = currWeatherInfos => {
    const getIconUrl = `http://openweathermap.org/img/wn/${currWeatherInfos.weather[0].icon}@2x.png`;
    $weatherBtnIcon.setAttribute('src', getIconUrl);
  };

  // ②
  const getCityWeather = async (lat, lon) => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0542651a9f965001a4d891288d5dee2&units=metric`);
    const currWeatherInfos = await res.json();
    setCurrWeatherInfos(currWeatherInfos);
    setWeatherIcons(currWeatherInfos);
  };

  const getForecast = async (lat, lon) => {
    const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a0542651a9f965001a4d891288d5dee2&units=metric`);
    const weatherInfos = await res.json();
    setWeatherInfos(weatherInfos);
  };

  // ①
  const getCityInfo = () => {
    // default: Seoul
    getForecast(37.5326, 127.024612);
    getCityWeather(37.5326, 127.024612);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getForecast(lat, lon);
        getCityWeather(lat, lon);
      });
    }
  };

  document.addEventListener('DOMContentLoaded', getCityInfo);

  // 팝업
  $weatherBtn.onclick = () => {


    if ($weatherApp.classList.contains('active')) {
      $weatherApp.classList.add('transition');
      $weatherApp.classList.replace('active', 'hide');
    } else {
      $weatherApp.classList.replace('hide', 'active');
    }
  };

  // 요일 선택
  [...$forecastList.children].forEach(liNode => {
    liNode.onclick = () => {
      if (liNode.classList.contains('selected')) return;
      
      [...$forecastList.children].forEach(li => {
        if (li === liNode) li.classList.add('selected');
        else li.classList.remove('selected');
      });
    };
  });
};

export default weatherHandler;
