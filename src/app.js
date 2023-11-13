const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");

const getGeoCoding = require("./utils/geocode");
const getForcast = require("./utils/forcast");

// console.log(__dirname)// the path this file is located
// console.log(__filename)// the exact file path

//Express path for express config
const home = path.join(__dirname, "../public");

//customising hbs(handle bars) views directory//
const viewPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(home));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    para: "Getting started with hbs dynamic rendering",
    name: "Emeka Joseph",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    para: "Getting started with hbs dynamic rendering",
    name: "Emeka Joseph",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message:
      "Please contact hbs at hbs.com to get all the information you need to know",
    title: "Help",
    name: "Emeka Joseph",
  });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address)
    return res.send({
      error: true,
      data: null,
      status: 400,
      message: "Address is needed",
    });

  getGeoCoding(address, (error, data) => {
    if (error) {
      return res.send({
        error: true,
        data: null,
        status: 404,
        message: error,
      });
    } else {
      getForcast(data, (error, forcast) => {
        if (error) {
          return res.send({
            error: true,
            data: null,
            status: 404,
            message: error,
          });
        } else {
          res.send({
            error: false,
            data: { location: data.placeName, forcast, address },
            status: 200,
            message: "Weather forcast successful",
          });
        }
      });
    }
  });
});

app.get("/help/*", (req, res) => {
  res.render("404Error", {
    errorMsg: "Help article not found",
    name: "Emeka Joseph",
    title: 404,
  });
});

app.get("*", (req, res) => {
  res.render("404Error", {
    errorMsg: "Page not found",
    name: "Emeka Joseph",
    title: 404,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
