const Director = require("../models/directorModel");
const Movie = require("../models/movieModel");

// // Add director endpoint
exports.addOneDirector = async (req, res) => {
  try {
    const newDirector = await Director.create(req.body);

    if (!newDirector) {
      return res.status(500).json({ message: "Cannot create new regjisor" });
    }

    return res.status(200).json(newDirector);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Add movie endpoint
exports.addOneMovie = async (req, res) => {
  try {
    // with body
    const newMovie = await Movie.create(req.body);

    // with params
    // const newMovie = await Movie.create({
    //   ...req.body,
    //   directorID: req.params.id,
    // });

    if (!newMovie) {
      return res.status(500).json({ message: "Cannot create new movie" });
    }

    return res.status(200).json(newMovie);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Find mobies with release year based on user input
exports.findMoviesWithReleaseYear = async (req, res) => {
  try {
    const movies = await Movie.find({ releaseYear: req.params.releaseYear });

    if (!movies) {
      return res.status(500).json({ message: "Cannot create new movie" });
    }

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Find movies with director name based on user input
exports.findMoviesWithDirectorName = async (req, res) => {
  try {
    const directori = await Director.findOne({ name: req.params.directorName });

    const movies = await Movie.find({ directorID: directori._id });

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(400).json(error);
  }
};

// Update director
exports.editDirector = async (req, res) => {
  try {
    const updatedDirector = await Director.findByIdAndUpdate(
      req.params.directorID,
      { ...req.body }
    );

    return res.status(200).json(updatedDirector);
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.findAllDirectors = async (req, res) => {
  try {
    const director = await Director.find();

    return res.status(200).json(director);
  } catch (error) {
    return res.status(400).json(error);
  }
};
