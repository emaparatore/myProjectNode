var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Product = mongoose.model('Product');

/* DELETE a product by id */
router.delete('/product/:id', function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, req.body, function (err, product) {
        if (err) return next(err);
        res.json(product);
    });
});

/* POST a product by id */
router.post('/product/:id', function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, req.body, function (err, product) {
        if (err) return next(err);
        res.json(product);
    });
});

/* GET the list of products */
router.get('/products', function (req, res, next) {
    Product.find(function (err, posts) {
        if (err) { return next(err); }

        res.json(posts);
    });
});

/* PUT a new product in the database */
router.put('/product', function (req, res, next) {
    var post = new Product(req.body);
    post.save(function (err, products) {
        if (err) { return next(err); }
        res.json(products);
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

/* GET home template */
router.get('/home.html', function (req, res, next) {
    res.render('home.html');
});

/* GET message template -directive- */
router.get('/modalMessage.html', function (req, res, next) {
    res.render('modalMessage.html');
});


/* GET icons bootstrapp */
//router.get('/fonts/glyphicons-halflings-regular.woff', function (req, res, next) {
//    res.send('glyphicons-halflings-regular.woff');
//});

//router.get('/fonts/glyphicons-halflings-regular.ttf', function (req, res, next) {
//    res.send('glyphicons-halflings-regular.ttf');
//});
module.exports = router;
