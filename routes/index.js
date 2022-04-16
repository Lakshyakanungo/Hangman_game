const express = require("express");
const router = express.Router();
const sessionsRouter = require("./sessions");

router.use("/sessions", sessionsRouter);

module.exports = router;
