const Express = require("express");
const routes = require("./routes");
const { sequelize, Word } = require("./models");

async function initialize() {
  const app = Express();

  app.use(Express.json());

  // app.get("/", (req, res) => {
  //   res.status(200).send("hello world");
  // });

  app.use(routes);

  await sequelize.sync();

  //required to do only once

  // TODO: done twice ...so delete these once

  // await Word.bulkCreate([
  //   {
  //     title: "my",
  //   },
  //   { title: "name is" },
  //   { title: "khan" },
  // ]);

  app.listen(4001, () => {
    console.log("app running on port 4001");
  });
}
initialize();
