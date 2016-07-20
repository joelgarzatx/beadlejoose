var express = require('express');
var router = express.Router();

// var Guest = require('../models/Guest.js');

  // router.param('user', function(req, res, next, value){
  //   console.log('Param: ' + value);
  //   next();
  // });

/* GET users listing. */
// router.get('/:user', function(req, res, next) {
router.get('/', function(req, res, next) {
  Guest.find(function(err, docs){
      // console.log('this got called');
      // call the views/check-in/index.jade file with variable
      // "guests" containing the results from the find()
    // res.render('check-in/index', {guests: docs, admin: 1});
  });
});

// handles POST in localhost:<port>/check-in
router.post('/', function(req, res, next){
  console.log(req.body);
  // var guest = new Guest({
  //   name: req.body.name,
  //   msg: req.body.msg
  // });
  // guest.save(function(err){
  //   if (err) res.send('error ' + err);
  //   else res.redirect('/jfjf');
  // });
});

module.exports = router;
