// Userlist data array for filling in info box
var userListData = [];

// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/userlist', function( data ) {

        // Stick our user data array into a userlist variable in the global object
        // For large apps, this is a bad idea, there should be a limit of users that get displayed and pagination built in
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

// Show User Info
function showUserInfo(event) {

    // First we're using .map to apply a function to each object in our userListData array. This will spit out a brand new array containing only whatever the function returns. 

    // That function (the anonymous callback function using the userObj parameter) strictly returns the username. So, basically, if our original data array contained two complete user objects, then the array returned by our use of .map here would only contain usernames, and look like this: ['Bob', 'Sue'].

    // So once we have THAT array, provided by .map, we're chaining indexOf, in combination with the username of our choice, to get the array index of that username. So Bob would be zero, and Sue would be one. 

    // We can then use that number, stored as arrayPosition, to go back to our original user data array and start pulling data, in the following code.

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve username from link rel attribute
    var thisUserName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { 
        return arrayItem.username; 
    }).indexOf(thisUserName);

    // Get our User Object
    var thisUserObject = userListData[arrayPosition];

    //Populate Info Box
    $('#userInfoName').text(thisUserObject.fullname);
    $('#userInfoAge').text(thisUserObject.age);
    $('#userInfoGender').text(thisUserObject.gender);
    $('#userInfoLocation').text(thisUserObject.location);


}

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);


});
