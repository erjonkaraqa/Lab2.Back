const { default: mongoose } = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
  },
  directorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Director",
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
