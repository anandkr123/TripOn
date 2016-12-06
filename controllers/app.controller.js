﻿var express = require('express');
var router = express.Router();

router.use('/', function (req, res, next) {
    if(req.path == '/login' && req.session.token){
        next();
    }else if (req.path !== '/login' && !req.session.token) {
        //return res.redirect('/login?returnUrl=' + encodeURIComponent('/app' + req.path));
        return res.redirect('/home');
    }else if(req.path == '/home'){
        return res.redirect('/home');
    }else{
        next();
    }

});



// Serve Static files from public
router.use('/', express.static('public'));


// make JWT token available to angular app
router.get('/token', function (req, res) {
    res.send(req.session.token);
});

// serve angular app files from the '/app' route
router.use('/', express.static('app'));

module.exports = router;