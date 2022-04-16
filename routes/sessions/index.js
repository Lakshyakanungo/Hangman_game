const express = require("express");
const router = express.Router();
const controller = require("./controller");

// router.get("/", (req, res) => {
//   res.status(200).send("coolll");
// });
router.post("/", controller.CreateSession);
router.post("/:id/play", controller.PlaySession);

module.exports = router;
