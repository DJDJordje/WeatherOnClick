'use strict';
import { ID, KEY } from '/keys.js';
import {
  upperCase,
  allUpper,
  setPlaceData,
  setWeatherInfo,
  setWeatherImg,
} from '/helpers.js';

const weather = document.querySelector('#weather');
const btn = document.querySelector('button');
const weatherHeadline = document.querySelector('.weather-headline');
const weatherInfo = document.querySelector('.weather-info');
const preMessage = document.querySelector('.pre-message');
const weatherImg = document.querySelector('.img');
const dayPart = document.createElement('div');
let map1;
let popup;
let marker;
let isDataThere = false;
if (!isDataThere) {
  const preHeadLine = `Default behavior, click on desire place on map!`;
  preMessage.append(preHeadLine);
}
const weatherData = async function (lat, lng) {
  dayPart.innerHTML = '';
  const ul = document.createElement('ul');
  const response1 = await fetch(
    `https://api.aerisapi.com/conditions/${lat},${lng}?to=+3days&client_id=${ID}&client_secret=${KEY}`
  );
  const data = await response1.json();
  if (!data) return;
  const { response } = data;
  console.log(data, response, 'WEATHERDATA');
  //weather.innerHTML = '';
  isDataThere = true;
  preMessage.innerHTML = '';
  response.forEach(element => {
    console.log(element);
    const periods = element.periods.map((val, i) => {
      return { val, i };
    });
    console.log(periods, 'PERIODS');
    let placeData = {
      city: element.place?.name ? element.place.name : '',
      country: element.place?.country ? element.place.country : '',
    };
    popupInfo = {
      city: element.place?.name
        ? upperCase(element.place?.name)
        : 'Place without population',
      country: element.place?.country
        ? allUpper(element.place?.country)
        : 'Free land',
    };
    console.log(placeData, 'PLACEDATA');

    console.log(popupInfo, 'ppopupinfo');
    periods.forEach((el, i) => {
      if (!i) return;
      const li = document.createElement('li');
      li.innerText = i + 'h';
      li.addEventListener('click', function (e) {
        console.log(e.target.value);
        const index = e.target.value;
        const data = periods.find(el => el.i === index);
        setWeatherInfo(weatherInfo, data);
        setWeatherImg(data);
        console.log(el.val.weatherPrimary, data, 'elementTTTTTTT');
      });
      li.setAttribute('value', i);
      ul.appendChild(li);
    });
    dayPart.classList.add('part');
    dayPart.appendChild(ul);
    setWeatherImg(periods[0]);
    setWeatherInfo(weatherInfo, periods[0]);
    setPlaceData(weatherHeadline, placeData);
    weather.insertAdjacentElement('afterbegin', dayPart);
  });
  return popupInfo;
};

function goToHome(isActive = false) {
  dayPart.innerText = '';
  isActive = true;

  navigator.geolocation.getCurrentPosition(
    function (e) {
      console.log(e);
      if (isActive) {
        let coords = !isActive
          ? [51.505, -0.09]
          : [e.coords.latitude, e.coords.longitude];
        marker = L.marker(coords).addTo(map1);
        map1.setView(coords, 14, {
          pan: {
            duration: 2.5,
            animate: true,
          },
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map1);
      }
    },
    error => {
      console.log(error);
    }
  );
}

map1 = L.map('map').setView([51.505, -0.09], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map1);
let popupInfo;
map1.on('click', function (e) {
  const c = e.latlng;
  const { lat, lng } = c;
  weatherImg.style.display = 'block';
  if (marker) {
    map1.removeLayer(marker);
  }
  weatherData(lat, lng).then(res => {
    const { city, country } = res;
    console.log(city, country);
    marker = new L.marker([lat, lng]);
    map1.addLayer(marker);
    popup = L.popup()
      .setLatLng([lat, lng])
      .setContent(`<p>City: ${city}<br />Country: ${country}</p>`);
    map1.addLayer(popup);
    console.log(res, 'promise on click');
  });

  console.log(lat, lng);
});
btn.addEventListener('click', goToHome);

//helpers
console.log(window.innerHeight, window.innerWidth);
window.addEventListener('change', function () {
  console.log(window.innerHeight, window.innerWidth);
});
