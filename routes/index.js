var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Client = mongoose.model('Client');

/* DELETE a product by id */
router.delete('/product/:id', function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

/* POST a product by id */
router.post('/product/:id', function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

/* GET the list of products */
router.get('/products', function (req, res, next) {
    Product.find()
        .sort({ timeDeposit: 1, maxDailyProduction :1})
        .exec(function (err, data) {
        if (err) { return next(err); }

        res.json(data);
    });
});

/* PUT a new product in the database */
router.put('/product', function (req, res, next) {
    var product = new Product(req.body);
    product.save(function (err, data) {
        if (err) { return next(err); }
        res.json(data);
    });
});




/* DELETE a client by id */
router.delete('/client/:id', function (req, res, next) {
    Client.findByIdAndRemove(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

/* POST a client by id */
router.post('/client/:id', function (req, res, next) {
    Client.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
        if (err) return next(err);
        res.json(data);
    });
});

/* GET the list of clients */
router.get('/clients', function (req, res, next) {
    Client.find()
        .sort({dayNotice:1, averageRevenue:-1})
        .exec(function (err, data) {
        if (err) { return next(err); }
        res.json(data);
    });
});

/* PUT a new client in the database */
router.put('/client', function (req, res, next) {
    var client = new Client(req.body);
    client.save(function (err, data) {
        if (err) { return next(err); }
        res.json(data);
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