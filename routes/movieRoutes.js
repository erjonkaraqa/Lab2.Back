const express = require("express");
const movieController = require("../controllers/movieController");

const router = express.Router();

router.post("/", movieController.addOneDirector);
router.post("/createMovie", movieController.addOneMovie);
router.get("/:releaseYear", movieController.findMoviesWithReleaseYear);
router.get(
  "/withDirectorName/:directorName",
  movieController.findMoviesWithDirectorName
);
router.patch("/:directorID", movieController.editDirector);
router.get("/all/directors", movieController.findAllDirectors);

module.exports = router;
