const Express = require("express");
const routes = require("./routes");
const { sequelize, Word } = require("./models");
// const fetch = require("node-fetch");
const dotenv = require("dotenv");

async function initialize() {
  const app = Express();
  dotenv.config();

  app.use(Express.json());

  console.log("okay recieved request");
  //setting Access-Control-Allow-Origin header to rectify cors error
  app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "https://hangmann-app.netlify.app/");
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.set(
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    next();
  });

  app.get("/", (req, res) => {
    res.status(200).send("hello world");
  });

  app.use(routes);

  await sequelize.sync();

  //required to do only once

  // TODO: done twice ...so delete these once
  // const array = [
  //   "purple",
  //   "orange",
  //   "family",
  //   "twelve",
  //   "silver",
  //   "Godard",
  //   "thirty",
  //   "donate",
  //   "people",
  //   "future",
  //   "Heaven",
  //   "banana",
  //   "Africa",
  //   "Monday",
  //   "office",
  //   "nature",
  //   "eleven",
  //   "Mumbai",
  //   "animal",
  //   "twenty",
  //   "snitch",
  //   "Rachel",
  //   "Friday",
  //   "Father",
  //   "yellow",
  //   "poetry",
  //   "August",
  //   "broken",
  //   "potato",
  //   "Sunday",
  //   "circle",
  //   "school",
  //   "breath",
  //   "moment",
  //   "circus",
  //   "person",
  //   "scarce",
  //   "London",
  //   "energy",
  //   "sister",
  //   "spring",
  //   "change",
  //   "monkey",
  //   "system",
  //   "Austin",
  //   "secret",
  //   "pirate",
  //   "turtle",
  //   "ninety",
  //   "mother",
  // ];
  // const lower = array.map((ele) => ele.toLocaleLowerCase());

  // let bulkwords = lower.map((o) => {
  //   return {
  //     title: o,
  //   };
  // });

  // await Word.bulkCreate(bulkwords);

  const port = process.env.PORT || 4001;
  // if (port == null || port == "") {
  //   port = 4001;
  // }

  app.listen(port, () => {
    console.log(`app running on port ${port} `);
  });
}
initialize();
