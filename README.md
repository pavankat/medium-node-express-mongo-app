# This is a MEAN STACK CRUD sample app (mongoDB, Express.js, Angular.js, Node.js)
* this is a single page fried chicken spot logger app. 

* we're using a MEAN stack with Mongoose (connects to mongoDB using Models), however, if you want to start off with something lighter then	
	* you can see how to accomplish doing this with a JEMN stack with Monk (connects to mongoDB without Models) - jQuery, Express.js, mongoDB and Node.js by going to the other branch of this repository

* We'll be leveraging Angular.js to make our app a single page app.

* Express.js is the framework we'll use to handle routing, handling of parameters and rendering of HTML

* We'll use mongoDB to store data and we'll use mongoose as the ORM (object relational mapper) to mongoDB. Mongoose will make communicating to mongoDB easier for us.
	- Documentation for Mongoose: http://mongoosejs.com/docs/

* Node.js is the backend programming language we'll be using

* We'll use jade to render the views even though it sucks.
	- http://stackoverflow.com/questions/7666977/syntax-highlighting-for-jade-in-sublime-text-2

# GOAL
* this app will help demonstrate REST in the simplest possible way for beginners

## OBJECTIVES
* Learn what REST means in plain English
* Store and retrieve JSON data in a MongoDB collection using HTTP POST and HTTP GET
* Remove data from the collection using HTTP DELETE
* Use AJAX for all data operations
* Update the DOM with Angular.js

### Learn what REST means in plain English

* EASY EXPLANATION
	* if you Want you can skip all the shit below, and just understand this in the context of a web app that let's you log fried chicken restaurants (what this app does) 

		* REST means you have 4 types of URLs for a fried chicken spot: create a fried chicken spot (A POST ROUTE), read a fried a chicken spot (A GET ROUTE), update a fried chicken spot (A PUT ROUTE) and delete a fried chicken spot (A DELETE ROUTE).

* HARD EXPLANATION (with theory)
	* Use HTTP methods explicitly.
	* Be stateless.
	* Expose directory structure-like URIs.
	* Transfer XML, JavaScript Object Notation (JSON), or both.

#### Use HTTP methods explicitly.
	To retrieve data, you use GET. To create data, you use POST. To update or change data, you use PUT. To delete data you use DELETE.

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


### COMMANDS I USED WHEN STARTING THE APP

when starting the app for the first time: 
	- in a new tab in terminal where your code is located:
		`mkdir data`

		`mongod --dbpath /Users/pavankatepalli/Desktop/git/medium-node-express-mongo-app/data`

in a new tab I can make a fried chicken spot initially doing this:
	`mongo`

	`use nodetest2`

	db.friedChickenList.insert({'restaurantname' : 'Thunder Fried Chicken','address' : '194 23rd Street New York, New York','website' : 'www.thunderfriedchicken-willblow-you-away.com'})

	db.friedChickenList.find().pretty()
		- prints out the fried chicken spot results all pretty like

### NOTES

* http://localhost:3000/chickenspots/friedChickenList
	- shows the json for fried chicken spots

* http://localhost:3000
	- shows the app

* Debugging
	* Installing node inspector globally
		* sudo npm install -g node-inspector
	* In a new tab, directory, run this in the file directory: node --debug ./bin/www
	* In a new tab, run this in the file directory: node-inspector

	* Alternative way of debugging
		* couldn't get any of this to work in execution
			* node debug app.js

			* run
			 or
			* r

			- when you hit the script in browser then
				- it'll pause
				- you use this 
					* repel
				- to be able to see what the variables are

			* then use debugger;

			* then 
				* cont, c - Continue execution
				* next, n - Step next
				* step, s - Step in
				* out, o - Step out
				* pause - Pause running code (like pause button in Developer Tools)

