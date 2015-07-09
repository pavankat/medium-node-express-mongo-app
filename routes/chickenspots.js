var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ChickenSpot = mongoose.model('ChickenSpot')

	/*
	 * GET friedChickenList.
	 */
	router.get('/friedchickenlist', function(req, res) {
        return ChickenSpot.find(function(err, spots) {
          if(!err) {
            return res.send(spots);
          } else {
            res.statusCode = 500;
            console.log('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
          }
        });
	});

	/*
	 * GET the fried chicken spot.
	 */
	router.get('/friedchickenspot/:id', function(req, res) {
	    ChickenSpot.findById(req.params.id, function (err, spot) {
	      if (err) {
	        console.log('GET Error: There was a problem retrieving: ' + err);
	      } else {
	        res.json(spot);
	      }
	    });
	});

	/*
	 * POST to addspot.
	 */
	router.post('/addspot', function(req, res) {

		ChickenSpot.create(req.body, function (err, spot) {
			if (err) {
			    res.send("There was a problem adding the information to the database.");
			} else {			    
			    res.json(JSON.stringify(200));
			}
		});
	});

	/*
	 * PUT to update spot.
	 */
	router.put('/updatefriedchicken/:id', function(req, res) {
		var id = req.params.id;
	    var whatToUpdateWith = req.body;
	    delete whatToUpdateWith._id;

	    //find the document by ID
	    ChickenSpot.findById(req.params.id, function (err, spot) {
	        //update it
	        spot.update(whatToUpdateWith, function (err, spotID) {
	          if (err) {
	            res.send(JSON.stringify("There was a problem updating the information to the database: " + err));
	          } 
	          else {
	          	res.send(JSON.stringify(200));
	          }
	        })
	    });
	});

	/*
	 * DELETE to delete the spot.
	 */
	router.delete('/deletespot/:id', function(req, res) {
	    
	    //find the document by ID
	    ChickenSpot.findById(req.params.id, function (err, spot) {
	        //delete it
	        spot.remove(function (err, spot) {
	            if (err) {
	                return console.error(err);
	            } else {
	            	res.send('');
	            }
	        });


	    });
	});

module.exports = router;
