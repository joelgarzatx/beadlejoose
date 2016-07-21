var express = require('express');
var router = express.Router();

var Bead = require('../models/Bead.js');

function addBead(req, res){
  var beads = new Bead({
    id: req.body.id,
    desc: req.body.desc,
    qty: req.body.qty
  });
  beads.save(function(err){
    if (err){
      var isEmpty = err.message.indexOf("validation failed") !== -1;
      var dupIndex = err.message.indexOf("dup key:");
      var isDup = dupIndex !== -1;
      // console.log(err);
      // console.log('===');
      if(isEmpty){
        // console.log(err.message);
        req.session.error = 'Error: No Empty Fields Allowed';
      } else if(isDup) {
        dupMsg = err.message.substring(dupIndex).replace(/([^\d])/g, '');
        req.session.error = `No Duplicate ID Allowed: id:${dupMsg}`;
      }
      // console.log('===');
      res.redirect('/inventory');
    } else {
      res.redirect('/inventory');
    }
  });
}

function updateBead(req, res) {
  console.log(req.body);
  var newQty = req.body.qtyText;
  var id = req.body.id;
  // console.log(`id: ${id} | ${newQty}`);
  Bead.findOne({id: id}, function(err, doc) {
    // console.log(`found one: ${doc}`);
    if(doc) {
      doc.qty = newQty;
      doc.save();
      req.session.success = "Update Successful";
    } else {
      req.session.error = "Unknown Error, Unable to Update Value";
      res.redirect('/inventory');
    }
  });
}

function removeBeads(req, res) {
  var removeList = req.body.removeList.split(',');
  console.log(removeList);
  for (i in removeList) {
    id = removeList[i];
    console.log(id);
    // Bead.remove({id: id});
    Bead.find({id: id}).remove().exec();
  }
  res.redirect('/inventory');

}

/* GET users listing. */
// router.get('/:user', function(req, res, next) {
router.get('/', function(req, res, next) {
  Bead.find(function(err, docs){
    // same as: {error : req.session.error}
    res.locals.error = req.session.error;
    res.locals.success= req.session.success;
    req.session.error = null;
    req.session.success = null;
    res.render('inventory/index', {beads: docs});
  });
});

router.post('/', function(req, res, next){

  var act = req.body.act;
  console.log(act);

  if (act === "add") {
    addBead(req, res);

  } else if(act === "update") {
    updateBead(req, res);

  } else if(act == "remove") {
    removeBeads(req,res);
  }

});

router.get('/:id', function(req, res, next){
  // Bead.findOne(req.params.id, function(err, doc){
  //   doc.qty = req.body.qty;
  //   doc.save();
  // });
  res.send(req.params);
});

module.exports = router;
