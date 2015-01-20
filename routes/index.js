var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Products = mongoose.model('Product');


router.get('/products', function (req, res, next) {
    Products.find(function (err, posts) {
        if (err) { return next(err); }

        res.json(posts);
    });
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});

/* GET clients template */
router.get('/clients.html', function (req, res, next) {
    res.render('clients.html');
});

/* GET clients template */
router.get('/products.html', function (req, res, next) {
    res.render('products.html');
});

/* GET notFound template */
router.get('/home.html', function (req, res, next) {
    res.render('home.html');
});


module.exports = router;
