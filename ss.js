// key for api
const akey = "c9fd1f1975b1ba8df031674f4e65267e";
//api url

const aurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const icon = document.querySelector(".wheather-icon"); // Corrected selector

async function checkWeather(city) {
  const response = await fetch(aurl + city + `&appid=${akey}`);
  const data = await response.json();
  console.log(data);
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
  console.log(data);


  if (data.weather[0].main === "Clouds") { // Capitalized "Clouds"
    icon.src = "images/clouds.png";
  } else if (data.weather[0].main === "Clear") { // Capitalized "Clear"
    icon.src = "images/clear.png";
  } else if (data.weather[0].main === "Drizzle") { // Capitalized "Drizzle"
    icon.src = "images/drizzle.png";
  } else if (data.weather[0].main === "Mist") { // Capitalized "Mist"
    icon.src = "images/mist.png";
  } else if (data.weather[0].main === "Rain") { // Capitalized "Rain"
    icon.src = "images/rain.png";
  } else if (data.weather[0].main === "Snow") { // Capitalized "Snow"
    icon.src = "images/snow.png";
  } else {
    icon.src = "images/clear.png"; // Default icon for other conditions
  }
}

searchbtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
});
