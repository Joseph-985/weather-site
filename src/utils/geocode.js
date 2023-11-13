const request = require("request");

const getGeoCoding = (location, callbackFn) => {
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    location
  )}.json?access_token=pk.eyJ1IjoibmV0b3dlYmRldiIsImEiOiJjbG8xY2ZmcnQxaDJ6Mm5vNjljMjU0NHJ6In0._2raeVFdN8Oe9tcPv0qBug&limit=1`;
  request({ url: geocodeUrl, json: true }, (error, response) => {
    if (error) {
      callbackFn("Unable to connect to web", undefined);
    } else if (response.body.features.length === 0) {
      callbackFn("Unable to find location try another search", undefined);
    } else {
      const center = response.body.features[0].center;
      const placeName = response.body.features[0].place_name;
      const long = center[0];
      const lat = center[1];

      callbackFn(undefined, { long, lat, placeName });

      // console.log(`long=>${center[0]}, lat=>${center[1]}`);
    }
  });
};

module.exports = getGeoCoding;
