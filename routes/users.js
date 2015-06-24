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


	/*
	 * GET user.
	 */
	// router.get('/user', function(req, res) {
	//     var db = req.db;

	//     var user = db.products.find( { qty: { $gt: 25 } } )
	    
	//     res.json(user);

	// });

	/*
	 * POST to adduser.
	 */
	router.post('/adduser', function(req, res) {
	    var db = req.db;
	    var collection = db.get('userlist');
	    collection.insert(req.body, function(err, result){
	        res.send(
	            (err === null) ? { msg: '' } : { msg: err }
	        );
	    });
	});

	/*
	 * PUT to updateuser.
	 */
	router.put('/updateuser/:id', function(req, res) {
		var db = req.db;
		var collection = db.get('userlist');

		var id = req.params.id;
	    var whatToUpdateWith = req.body;
	    delete whatToUpdateWith._id;

	    process.stdout.write("-------------THE ID----------------");
	    process.stdout.write(id);
	    process.stdout.write("-------------THE ID----------------");
	    
	    collection.findAndModify({_id: id}, {$set: whatToUpdateWith}, function(err) {
	        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
	    });
	});

	/*
	 * DELETE to deleteuser.
	 */
	router.delete('/deleteuser/:id', function(req, res) {
	    var db = req.db;
	    var collection = db.get('userlist');
	    var userToDelete = req.params.id;
	    collection.remove({ '_id' : userToDelete }, function(err) {
	        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
	    });
	});

module.exports = router;
