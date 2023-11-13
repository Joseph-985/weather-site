const getWeatherForcast = async (location) => {
  const response = await fetch(
    `http://localhost:3000/weather?address=${location}`
  );
  if (response.error) {
    console.log(response.message);
    return;
  }

  const data = await response.json();
  return data;
};

const form = document.querySelector("form");
const searchValue = document.querySelector("input");
const title = document.querySelector("#location");
const paragraph1 = document.querySelector("#para1");
const paragraph2 = document.querySelector("#para2");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loaction = searchValue.value;
  paragraph1.textContent = "Loading...";
  paragraph2.textContent = "";
  title.textContent = "";

  const weatherInfo = await getWeatherForcast(loaction);

  if (weatherInfo.error) {
    paragraph1.textContent = weatherInfo.message;
    paragraph2.textContent = "";
    title.textContent = "";
  } else {
    title.textContent = weatherInfo.data.address;
    paragraph1.textContent = weatherInfo.data.location;
    paragraph2.textContent = weatherInfo.data.forcast;
  }

  // if (loaction) {

  // }
});
