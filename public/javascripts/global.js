// DOM Ready =============================================================
$(document).ready(function() {

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
                tableContent += '<td><a href="#" class="linkedituser" rel="' + this._id + '">edit</a></td>';
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

    // Add User
    function addUser(event) {
        event.preventDefault();

        // Super basic validation - increase errorCount variable if any fields are blank
        var errorCount = 0;
        $('#addUser input').each(function(index, val) {
            if($(this).val() === '') { errorCount++; }
        });

        // Check and make sure errorCount's still at zero
        if(errorCount === 0) {

            // If it is, compile all user info into one object
            var newUser = {
                'username': $('#addUser fieldset input#inputUserName').val(),
                'email': $('#addUser fieldset input#inputUserEmail').val(),
                'fullname': $('#addUser fieldset input#inputUserFullname').val(),
                'age': $('#addUser fieldset input#inputUserAge').val(),
                'location': $('#addUser fieldset input#inputUserLocation').val(),
                'gender': $('#addUser fieldset input#inputUserGender').val()
            }

            // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'POST',
                data: newUser,
                url: '/users/adduser',
                dataType: 'JSON'
            }).done(function( response ) {

                // Check for successful (blank) response
                if (response.msg === '') {

                    // Clear the form inputs
                    $('#addUser fieldset input').val('');

                    // Update the table
                    populateTable();

                }
                else {

                    // If something goes wrong, alert the error message that our service returned
                    alert('Error: ' + response.msg);

                }
            });
        }
        else {
            // If errorCount is more than 0, error out
            alert('Please fill in all fields');
            return false;
        }
    };

    // Delete User
    function deleteUser(event) {

        event.preventDefault();

        // Pop up a confirmation dialog
        var confirmation = confirm('Are you sure you want to delete this user?');

        // Check and make sure the user confirmed
        if (confirmation === true) {

            // If they did, do our delete
            $.ajax({
                type: 'DELETE',
                url: '/users/deleteuser/' + $(this).attr('rel')
            }).done(function( response ) {

                // Check for a successful (blank) response
                if (response.msg === '') {
                }
                else {
                    alert('Error: ' + response.msg);
                }

                // Update the table
                populateTable();

            });

        }
        else {

            // If they said no to the confirm, do nothing
            return false;

        }

    };

    // Edit User
    function editUser(event) {
        // Prevent Link from Firing
        event.preventDefault();

        // Retrieve username from link rel attribute
        var thisUserName = $(this).parent().prev().prev().find('a').attr('rel');

        // Get Index of object based on id value
        var arrayPosition = userListData.map(function(arrayItem) { 
            return arrayItem.username; 
        }).indexOf(thisUserName);

        // Get our User Object
        var thisUserObject = userListData[arrayPosition];

        //Populate Edit Form
        $('#editUser fieldset input#inputUserName').val(thisUserObject.username);
        $('#editUser fieldset input#inputUserEmail').val(thisUserObject.email);
        $('#editUser fieldset input#inputUserFullname').val(thisUserObject.fullname);
        $('#editUser fieldset input#inputUserAge').val(thisUserObject.age);
        $('#editUser fieldset input#inputUserLocation').val(thisUserObject.location);
        $('#editUser fieldset input#inputUserGender').val(thisUserObject.gender);

        $('#addUserH2').addClass('hide');
        $('#addUser').addClass('hide');

        $('#editUserH2').removeClass('hide');
        $('#editUser').removeClass('hide');

        //set this as a global variable
        //we need this to update the user in the updateUser function
        editUserId = thisUserObject._id;
    }

    // Update User
    function updateUser(event){
        // Super basic validation - increase errorCount variable if any fields are blank
        var errorCount = 0;
        $('#editUser input').each(function(index, val) {
            if($(this).val() === '') { errorCount++; }
        });

        // Check and make sure errorCount's still at zero
        if(errorCount === 0) {

            // If it is, compile all user info into one object
            var editUser = {
                'username': $('#editUser fieldset input#inputUserName').val(),
                'email': $('#editUser fieldset input#inputUserEmail').val(),
                'fullname': $('#editUser fieldset input#inputUserFullname').val(),
                'age': $('#editUser fieldset input#inputUserAge').val(),
                'location': $('#editUser fieldset input#inputUserLocation').val(),
                'gender': $('#editUser fieldset input#inputUserGender').val()
            }

            // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'PUT',
                data: editUser,
                url: '/users/updateuser/' + editUserId, //editUserId is a global variable we set in the editUser function
                dataType: 'JSON'
            }).done(function( response ) {
                
                debugger;

                // Check for successful (blank) response
                if (response.msg === '') {

                    // Clear the edit form inputs, hide the edit form and 
                    hideAndClearEditShowAddForm();

                    // Update the table
                    populateTable();

                }else {

                    // If something goes wrong, alert the error message that our service returned
                    alert('Error: ' + response.msg);

                }
            });
        }
        else {
            // If errorCount is more than 0, error out
            alert('Please fill in all fields');
            return false;
        }
    }

    function hideAndClearEditShowAddForm(){
        $('#editUserH2').addClass('hide');
        $('#editUser').addClass('hide');

        $('#addUserH2').removeClass('hide');
        $('#addUser').removeClass('hide');

        $('#editUser fieldset input#inputUserName').val('');
        $('#editUser fieldset input#inputUserEmail').val('');
        $('#editUser fieldset input#inputUserFullname').val('');
        $('#editUser fieldset input#inputUserAge').val('');
        $('#editUser fieldset input#inputUserLocation').val('');
        $('#editUser fieldset input#inputUserGender').val('');
    }

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);

    // Add User button click
    $('#btnAddUser').on('click', addUser);


    // Delete User link click
    $('#userList table tbody').on('click', 'td a.linkdeleteuser', deleteUser);

    $('#userList table tbody').on('click', 'td a.linkedituser', editUser);

    $('#btnEditUser').on('click', updateUser);

    $('#btnCancelEdit').on('click', hideAndClearEditShowAddForm)


});
