const weatherImg = document.querySelector('.img');
export let dayWeather = [
  {
    clear: 'weather-pic/sunny.jpg',
    cloudy: 'weather-pic/cloudy.jpg',
    partlyCloudy: 'weather-pic/partly cloudy.jpg',
    rain: 'weather-pic/rain.jpg',
    lightRain: 'weather-pic/light rain.jpg',
    snow: 'weather-pic/snow.jpg',
    lightSnow: 'weather-pic/light snow.jpg',
    wind: 'weather-pic/wind.jpg',
    termometar: 'weather-pic/termometar.jpg',
  },
  {
    clear: 'weather-pic/clear.jpg',
    cloudy: 'weather-pic/cloudy.jpg',
    partlyCloudy: 'weather-pic/partly cloudy (2).jpg',
    rain: 'weather-pic/rain.jpg',
    lightRain: 'weather-pic/schattered rain.jpg',
    snow: 'weather-pic/snow.jpg',
  },
];

export const upperCase = function (stringg) {
  let a;
  //spliting string to get array
  //stringg = null ? '' : stringg;
  if (stringg) {
    a = stringg.split('-');
  } else {
    a = stringg.split([' ']);
  }

  let b = a.map(el => {
    return el;
  });

  const wordUp = function (w) {
    let ot;
    if (!w) {
      ot = 'There is no populated name for this location.';
      return;
    }
    ot = w[0].toUpperCase() + '' + w.substring(1, w.length);
    return ot;
  };
  const [first, secund, third] = b;
  let output;
  switch (b.length) {
    case 1:
      output = wordUp(first);
      break;
    case 2:
      output = wordUp(first) + ' ' + wordUp(secund);
      break;
    case 3:
      output = wordUp(first) + ' ' + wordUp(secund) + ' ' + wordUp(third);
      break;
  }
  return output;
};
export const allUpper = function (word) {
  let word1 = word.split('');
  let word12 = word1
    .map(el => {
      return el.toUpperCase();
    })
    .join('');
  return word12;
};
export const setPlaceData = function (div, data) {
  div.innerHTML = '';
  const { city, country } = data;
  console.log(city, country, 'SEPLACE');
  const spanCity = document.createElement('span');
  const spancountry = document.createElement('span');
  spanCity.innerHTML = !city ? 'Location without name.' : upperCase(city);

  spancountry.innerHTML = allUpper(country);
  console.log(upperCase(city));
  div.appendChild(spanCity);
  div.appendChild(spancountry);
};
export const setWeatherInfo = function (div, data) {
  div.innerHTML = '';
  const temperature = document.createElement('span');
  const weather = document.createElement('span');
  const wind = document.createElement('span');
  temperature.innerHTML = data.val.tempC + ' °C';
  weather.innerHTML = data.val.weather;
  wind.innerHTML = 'Wind is ' + data.val.windSpeedKPH + ' kph';
  div.appendChild(weather);
  div.appendChild(temperature);
  div.appendChild(wind);
};
export const spw = function (data, div, isDay = true) {
  let pw = data.val.weatherPrimary;
  const index = isDay ? 1 : 0;
  if (
    pw === 'Mostly Sunny' ||
    pw === 'Sunny' ||
    pw === 'Clear' ||
    pw === 'Mostly Clear'
  ) {
    div.src = dayWeather[index].clear;
  }
  if (pw === 'Partly Sunny' || pw === 'Partly Cloudy') {
    div.src = dayWeather[index].partlyCloudy;
  }
  if (pw === 'Mostly Cloudy' || pw === 'Cloudy') {
    div.src = dayWeather[index].cloudy;
  }
  if (pw === 'Rain' || pw === 'Rain Showers') {
    div.src = dayWeather[index].rain;
  }
  if (
    pw === 'Light Rain' ||
    pw === 'Scattered Showers' ||
    pw === 'Isolated Showers'
  ) {
    div.src = dayWeather[index].lightRain;
  }

  if (pw === 'Snow' || pw === 'Snow Showers') {
    div.src = dayWeather[index].snow;
  }

  if (pw === 'Light Snow') {
    div.src = dayWeather[index].lightSnow;
  }
};

export const setWeatherImg = function (data) {
  weatherImg.innerHTML = '';
  if (data.val.isDay) {
    spw(data, weatherImg, true);
  } else {
    spw(data, weatherImg, false);
  }
};
