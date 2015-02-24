var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var Client = mongoose.model('Client');
var Order = mongoose.model('Order');
var Production = mongoose.model('Production');




/* GET icons bootstrapp */
//router.get('/fonts/glyphicons-halflings-regular.woff', function (req, res, next) {
//    res.send('glyphicons-halflings-regular.woff');
//});

//router.get('/fonts/glyphicons-halflings-regular.ttf', function (req, res, next) {
//    res.send('glyphicons-halflings-regular.ttf');
//});

//module.exports = router;

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

module.exports = function (passport) {

    /* GET login page. */
    router.get('/', function (req, res) {
        // Display the Login page with any flash message, if any
        res.render('index.jade', { message: req.flash('message') });
    });

    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true
    }));

    /* GET Registration Page */
    router.get('/signup', function (req, res) {
        res.render('register.jade', { message: req.flash('message') });
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /* GET Home Page */
    router.get('/home', isAuthenticated, function (req, res) {
        res.render('index.html', { user: req.user });
    });

    /* Handle Logout */
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    /* GET home page. */
    //router.get('/', function (req, res, next) {
    //    res.render('index.html');
    //});

    /* GET clients template */
    router.get('/clients.html', isAuthenticated, function (req, res, next) {
        res.render('clients.html');
    });

    /* GET clients template */
    router.get('/products.html', isAuthenticated, function (req, res, next) {
        res.render('products.html');
    });

    /* GET home template */
    router.get('/home.html', isAuthenticated, function (req, res, next) {
        res.render('home.html');
    });

    /* GET produciFacile template */
    router.get('/produciFacile.html', isAuthenticated, function (req, res, next) {
        res.render('produciFacile.html');
    });

    /* GET message template -directive- */
    router.get('/modalMessage.html', isAuthenticated, function (req, res, next) {
        res.render('modalMessage.html');
    });


    /* DELETE a product by id */
    router.delete('/product/:id', isAuthenticated, function (req, res, next) {
        Product.findByIdAndRemove(req.params.id, req.body, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    /* POST a product by id */
    router.post('/product/:id', isAuthenticated, function (req, res, next) {
        Product.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    /* GET the list of products */
    router.get('/products', isAuthenticated, function (req, res, next) {
        Product.find({ _idUser: req.user._id }, function (err, data) {
            if (err) { return next(err); }

            res.json(data);
        });
    });

    /* PUT a new product in the database */
    router.put('/product', isAuthenticated, function (req, res, next) {
        var product = new Product(req.body);
        product._idUser = req.user._id;
        product.save(function (err, data) {
            if (err) { return next(err); }
            res.json(data);
        });
    });



    /* DELETE a client by id */
    router.delete('/client/:id', isAuthenticated, function (req, res, next) {
        Client.findByIdAndRemove(req.params.id, req.body, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    /* POST a client by id */
    router.post('/client/:id', isAuthenticated, function (req, res, next) {
        Client.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    /* GET the list of clients */
    router.get('/clients', isAuthenticated, function (req, res, next) {
        
        Client.find({ _idUser : req.user._id }, function (err, data) {
            if (err) { return next(err); }
            res.json(data);
        });
    });

    /* PUT a new client in the database */
    router.put('/client', isAuthenticated, function (req, res, next) {
        var client = new Client(req.body);
        client._idUser = req.user._id;
        client.save(function (err, data) {
            if (err) { return next(err); }
            res.json(data);
        });
    });


    /* DELETE an order by id */
    router.delete('/order/:id', isAuthenticated, function (req, res, next) {
        Order.findByIdAndRemove(req.params.id, req.body, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    /* POST an order by id */
    router.post('/order/:id', isAuthenticated, function (req, res, next) {
        Order.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    /* GET the list of orders */
    router.get('/orders', isAuthenticated, function (req, res, next) {
        Order.find({ _idUser: req.user._id }, function (err, data) {
            if (err) { return next(err); }
            res.json(data);
        });
    });

    /* PUT a new order in the database */
    router.put('/order', isAuthenticated, function (req, res, next) {
        var order = new Order(req.body);
        order._idUser = req.user._id;
        order.save(function (err, data) {
            if (err) { return next(err); }
            res.json(data);
        });
    });

    /* DELETE a production by id */
    router.delete('/production/:id', isAuthenticated, function (req, res, next) {
        Production.findByIdAndRemove(req.params.id, req.body, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    /* POST a production by id */
    router.post('/production/:id', isAuthenticated, function (req, res, next) {
        Production.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
            if (err) return next(err);
            res.json(data);
        });
    });

    /* GET the list of productions */
    router.get('/productions', isAuthenticated, function (req, res, next) {
        Production.find({ _idUser: req.user._id }, function (err, data) {
            if (err) { return next(err); }

            res.json(data);
        });
    });

    /* PUT a new production in the database */
    router.put('/production', isAuthenticated, function (req, res, next) {
        var production = new Production(req.body);
        production._idUser = req.user._id;
        production.save(function (err, data) {
            if (err) { return next(err); }
            res.json(data);
        });
    });



   

    return router;
}