const API_KEY = "08186d60eef15d866a0bb2d250dbaa06";

const onGeoSuccess = (position) => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const weather = document.querySelector("#weather span:first-child");
      const city = document.querySelector("#weather span:last-child");
      
      weather.innerText = `${data.weather[0].main}, ${data.main.temp}℃`;
      city.innerText = data.name; 
    })
}

const onGeoError = () => {
  alert("Cannot find your location.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);