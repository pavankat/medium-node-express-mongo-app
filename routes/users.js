var express = require('express');
var router = express.Router();

//Pavan added this:
	/*
		The purpose of this code is: if you do an HTTP GET to /users/userlist, our server will return JSON that lists all of the users in the database. Obviously for a large-scale project you'd want to put in limits as to how much data gets spewed out at one time, for example by adding pagination to your front-end, but for our purposes this is fine. 
	*/
	/*
	 * GET userlist.
	 */
	router.get('/userlist', function(req, res) {
	    var db = req.db;
	    var collection = db.get('userlist');
	    collection.find({},{},function(e,docs){
	        res.json(docs);
	    });
	});

module.exports = router;
