import { doc } from "prettier";

const weatherHandler = () => {
  const $weatherBtn = document.querySelector('.weather__button');
  const $weatherBtnIcon = document.querySelector('.weather__button-icon');
  const $weatherCity = document.querySelector('.weather__city');
  const $weatherApp = document.querySelector('.weather__app');
  const $weatherCurrCity = document.querySelector('.weather__current-city');
  const $weatherCondition = document.querySelector('.weather__condition');
  const $weatherAppIcon = document.querySelector('.app__icon');
  const $weatherCurrStat = document.querySelector('.weather__stat-number');
  const $appCurrStat = document.querySelector('.app__stat-number');
  const $forecastList = document.querySelector('.forecast__list');
  const $forecastIcon1 = document.querySelector('.forecast__icon');

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
    // 초기화
    [...$weatherBtnIcon.firstElementChild.classList].forEach(classAttr => {
      $weatherBtnIcon.firstElementChild.classList.remove(classAttr);
    });
    [...$weatherAppIcon.firstElementChild.classList].forEach(classAttr => {
      $weatherAppIcon.firstElementChild.classList.remove(classAttr);
    });
    [...$forecastIcon1.firstElementChild.classList].forEach(classAttr => {
      $forecastIcon1.firstElementChild.classList.remove(classAttr);
    });

    // 날씨에 해당하는 아이콘 추가
    $weatherBtnIcon.firstElementChild.classList.add('wi');
    $weatherBtnIcon.firstElementChild.classList.add(`wi-day-${(currWeatherInfos.weather[0].main).toLowerCase()}`);
    $weatherAppIcon.firstElementChild.classList.add('wi');
    $weatherAppIcon.firstElementChild.classList.add(`wi-day-${(currWeatherInfos.weather[0].main).toLowerCase()}`);
    $forecastIcon1.firstElementChild.classList.add('wi');
    $forecastIcon1.firstElementChild.classList.add(`wi-day-${(currWeatherInfos.weather[0].main).toLowerCase()}`);
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
    setWeatherIcons(currWeatherInfos);
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
      $weatherApp.classList.replace('active', 'hide');
    } else $weatherApp.classList.replace('hide', 'active');
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
