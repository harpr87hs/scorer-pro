const scoreRouter = require("../routes/score/score.controller");
module.exports = (app) => {
  app.use("/score", scoreRouter);
};
