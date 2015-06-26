var express = require('express');
var router = express.Router();

//Pavan added this:
	/*
		The purpose of this code is: if you do an HTTP GET to /chickenspots/friedChickenList, our server will return JSON that lists all of the chickenspots in the database. Obviously for a large-scale project you'd want to put in limits as to how much data gets spewed out at one time, for example by adding pagination to your front-end, but for our purposes this is fine. 
	*/
	/*
	 * GET friedChickenList.
	 */
	router.get('/friedchickenlist', function(req, res) {
	    var db = req.db;
	    var collection = db.get('friedChickenList');
	    collection.find({},{},function(e,docs){
	        res.json(docs);
	    });
	});

	/*
	 * GET the fried chicken spot.
	 */
	router.get('/friedchickenspot/:id', function(req, res) {
	    var db = req.db;
	    var collection = db.get('friedChickenList');
	    var id = req.params.id;

	    spot = collection.findById(id, function(err, doc){
	    	console.log(doc);
	    	res.json(doc);
	    });
	});

	/*
	 * POST to addspot.
	 */
	router.post('/addspot', function(req, res) {
	    var db = req.db;
	    var collection = db.get('friedChickenList');
	    collection.insert(req.body, function(err, result){
	        res.send(
	            (err === null) ? { msg: '' } : { msg: err }
	        );
	    });
	});

	/*
	 * PUT to update spot.
	 */
	router.put('/updatefriedchicken/:id', function(req, res) {
		var db = req.db;
		var collection = db.get('friedChickenList');

		var id = req.params.id;
	    var whatToUpdateWith = req.body;
	    delete whatToUpdateWith._id;

	    //how to print to the console
	    process.stdout.write("-------------THE ID----------------");
	    process.stdout.write(id);
	    process.stdout.write("-------------THE ID----------------");

	    collection.updateById(id, whatToUpdateWith, function(err) {
	        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
	    });
	});

	/*
	 * DELETE to delete the spot.
	 */
	router.delete('/deletespot/:id', function(req, res) {
	    var db = req.db;
	    var collection = db.get('friedChickenList');
	    var spotToDelete = req.params.id;
	    collection.remove({ '_id' : spotToDelete }, function(err) {
	        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
	    });
	});

module.exports = router;
