# MOST IMPORTANT THING EVER

* Installing node inspector globally
	* sudo npm install -g node-inspector
* In a new tab, directory, run this in the file directory: node --debug ./bin/www
* In a new tab, run this in the file directory: node-inspector

# This is a JEMN STACK CRUD sample app (jQuery, Express.js, mongoDB, Node.js)
* We'll be leveraging the ajax and dom functions that jQuery provides to make our app a single page app.
* Express.js is the framework we'll use to handle routing, handling of parameters and rendering of HTML
* We'll use mongoDB to store data and we'll use monk as the ORM (object relational mapper) to mongoDB. Monk will make communicating to mongoDB easier for us.
* Node.js is the backend programming language we'll be using

# SUMMARY
* This is a Single Page CRUD App made with Express, Node.js, MongoDB, AJAX via jQuery app
* this app will help demonstrate REST in the simplest possible way for beginners

## OBJECTIVES
* Learn what REST means in plain English
* Store and retrieve JSON data in a MongoDB collection using HTTP POST and HTTP GET
* Remove data from the collection using HTTP DELETE
* Use AJAX for all data operations
* Update the DOM with jQuery

### Learn what REST means in plain English

* Use HTTP methods explicitly.
* Be stateless.
* Expose directory structure-like URIs.
* Transfer XML, JavaScript Object Notation (JSON), or both.

#### Use HTTP methods explicitly.
	To retrieve data, you use GET. To create data, you use POST. To update or change data, you use PUT (not used in this app). To delete data you use DELETE.

	So for example, this once-common approach is not a good one:

	http://www.domain.com/myservice/newuser.php?newuser=bob

	That's an HTTP GET pretending to be a POST. You're GET-ting the web page and giving it data to store in a DB at the same time. Instead, create a New User service and POST to it.

#### Be Stateless
	Imagine a pagination example. 

	A stateful design would hit a deliverPage service that's been keeping track of the page you're on, and delivers the next one. 

	A Stateless design would populate prevPage, currPage, and nextPage data in the markup (hidden input fields, JavaScript variables, data- attributes, and so on), and then HTTP GET a newPage service using the nextPage parameter from the markup to request a specific page.

#### Expose directory structure-like URIs.
	Instead of this:
		http://app.com/getfile.php?type=video&game=skyrim&pid=68

	You want:
		http://app.com/files/video/skyrim/68

#### Transfer XML, JavaScript Object Notation (JSON), or both.
	Just make sure that your back-end is sending XML or JSON. JSON is cool because you can easily manipulate this data in your presentation layer without having to hit your servers, unless you need new data.


### COMMANDS I USED

in a new tab
	`mkdir data`

	`mongod --dbpath /Users/pavankatepalli/Desktop/git/medium-node-express-mongo-app/data`

in a new tab
	`mongo`

	`use nodetest2`

	db.userlist.insert({'username' : 'test1','email' : 'test1@test.com','fullname' : 'Bob Smith','age' : 27,'location' : 'San Francisco','gender' : 'Male'})

### NOTES

http://localhost:3000/users/userlist
	- shows the json for users

http://localhost:3000
	- shows the app