var express = require("express");
const {
  ScoreDTOValidator,
  addScoreDTO,
  updateScoreDTO,
  deleteScoreDTO,
} = require("../../validators/score.validators");
const {
  getScores,
  addScore,
  updateScore,
  deleteScore,
} = require("./score.service");
var router = express.Router();

// get score by id
router.get("/:gameId", (req, res, next) => {
  try {
    const { gameId } = req.params;
    const scores = getScores(gameId);
    res.json({
      data: scores,
    });
  } catch (error) {
    next(error);
  }
});
// add score
router.post("/", ScoreDTOValidator(addScoreDTO), (req, res, next) => {
  const { gameId, userId, score } = req.body;
  try {
    const savedScore = addScore({ gameId, userId, score });
    res.json({
      data: savedScore,
    });
  } catch (error) {
    next(error);
  }
});
// updated exisiting score by id
router.put("/:gameId", ScoreDTOValidator(updateScoreDTO), (req, res, next) => {
  try {
    const { gameId } = req.params;
    const { userId, score } = req.body;
    const updatedScore = updateScore({ gameId, userId, score });
    if (updatedScore === null) {
      return res.status(404).json({
        error: "Score Not Found",
      });
    }
    res.json({
      data: updatedScore,
    });
  } catch (error) {
    next(error);
  }
});
// delete score by id
router.delete(
  "/:gameId",
  ScoreDTOValidator(deleteScoreDTO),
  async (req, res, next) => {
    const { gameId } = req.params;
    const { userId } = req.body;
    try {
      const deletedScore = await deleteScore({ gameId, userId });
      if (deletedScore === null) {
        return res.status(404).json({
          error: "Score not Found",
        });
      }
      res.json({
        data: deletedScore,
      });
    } catch (error) {
      next(error);
    }
  }
);
module.exports = router;
