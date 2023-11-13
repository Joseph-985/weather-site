const request = require("request");

const getForcast = ({ long, lat, placeName }, callbackFn) => {
  const url = `http://api.weatherstack.com/current?access_key=b73d31c9931e08b786e8a6254f78c1db&query=${long},${lat}&units=f`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callbackFn("Unable to connect to web", undefined);
    } else if (response.body.error) {
      callbackFn("Unable to find location try another search", undefined);
    } else {
      const current = response.body.current;
      const forcast = `${current.weather_descriptions[0]} It is currently ${current.temperature} degrees out, and its feels like ${current.feelslike} degrees out right now in ${placeName}`;
      callbackFn(undefined, forcast);
    }
  });
};

module.exports = getForcast;
