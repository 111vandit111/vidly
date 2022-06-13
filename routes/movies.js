const { Movie, validate } = require('../modules/movie');
const { Genres } = require('../modules/genres');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movie = await Movie.find().sort('title');
    res.send(movie);
})

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genres.findById(req.body.genreid);
    if (!genre) return res.status(400).send('Invalid genre.');


    let movie = new Movie({
        title: req.body.title,
        Genre: { _id: genre._id, name: genre.name },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    movie = await movie.save();
    res.send(movie);
})


router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, { new: true });

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');
    res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    if (!movie) return res.status(404).send('The genre with the given ID was not found.');
    res.send(movie);
});

router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send('The genre with the given ID was not found.');
    res.send(movie);
});


module.exports = router;