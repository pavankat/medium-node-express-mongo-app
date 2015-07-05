// DOM Ready =============================================================
$(document).ready(function() {

    // friedChickenList data array for filling in info box
    var friedChickenListData = [];

    // Fill table with data
    function populateTable() {

        // Empty content string
        var tableContent = '';

        // jQuery AJAX call for JSON
        $.getJSON( '/chickenspots/friedchickenlist', function( data ) {

            // Stick our chickenspots data array into a friedChickenList variable in the global object
            // For large apps, this is a bad idea, there should be a limit of chicken spots that get displayed and pagination built in
            friedChickenListData = data;

            // For each item in our JSON, add a table row and cells to the content string
            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td><a href="#" class="linkshowspot" rel="' + this._id + '">' + this.restaurantname + '</a></td>';
                tableContent += '<td>' + this.address + '</td>';
                tableContent += '<td>' + this.website + '</td>';
                tableContent += '<td><a href="#" class="linkeditspot" rel="' + this._id + '">edit</a></td>';
                tableContent += '<td><a href="#" class="linkdeletespot" rel="' + this._id + '">delete</a></td>';
                tableContent += '</tr>';
            });

            // Inject the whole content string into our existing HTML table
            $('#friedChickenList table tbody').html(tableContent);
        });
    };

    // Show Spot Info
    function showSpotInfo(event) {

        // Prevent Link from Firing
        event.preventDefault();

        // Retrieve the id from the link rel attribute
        var thisId = $(this).attr('rel');

        $.getJSON('/chickenspots/friedchickenspot/' + thisId).done(function(data) {
            // Get our Fried Chicken Spot Object
            var thisRestaurantObject = data;

            //Populate Info Box
            $('#restaurantName').text(thisRestaurantObject.restaurantname);
            $('#address').text(thisRestaurantObject.address);
            $('#website').text(thisRestaurantObject.website);

            $('#friedChickenInfo').css('display', 'inline');
         })
    }

    // Add Spot
    function addSpot(event) {
        event.preventDefault();

        // Super basic validation - increase errorCount variable if any fields are blank
        var errorCount = 0;
        $('#addSpot input').each(function(index, val) {
            if($(this).val() === '') { errorCount++; }
        });

        // Check and make sure errorCount's still at zero
        if(errorCount === 0) {

            // If it is, compile all user info into one object
            var newSpot = {
                'restaurantname': $('#addSpot fieldset input#inputRestaurantName').val(),
                'address': $('#addSpot fieldset input#inputAddress').val(),
                'website': $('#addSpot fieldset input#inputWebsite').val()
            }

            // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'POST',
                data: newSpot,
                url: '/chickenspots/addspot',
                dataType: 'JSON'
            }).done(function( response ) {

                // Check for successful (blank) response
                if (response.msg === '') {

                    // Clear the form inputs
                    $('#addSpot fieldset input').val('');

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

    // Delete Spot
    function deleteSpot(event) {

        event.preventDefault();

        // Pop up a confirmation dialog
        var confirmation = confirm('Are you sure you want to delete this spot?');

        // Check and make sure they really want to delete
        if (confirmation === true) {

            // If they did, do our delete
            $.ajax({
                type: 'DELETE',
                url: '/chickenspots/deletespot/' + $(this).attr('rel')
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

    

    // Edit Spot
    function editSpot(event) {

        // Prevent Link from Firing
        event.preventDefault();

        // Retrieve the id from the link rel attribute
        var thisId = $(this).attr('rel');

        // Get our Fried Chicken Spot Object
        $.getJSON('/chickenspots/friedchickenspot/' + thisId).done(function(data) {
            var thisRestaurantObject = data;

            //Populate Edit Form
            $('#editFriedChicken fieldset input#inputRestaurantName').val(thisRestaurantObject.restaurantname);
            $('#editFriedChicken fieldset input#inputAddress').val(thisRestaurantObject.address);
            $('#editFriedChicken fieldset input#inputWebsite').val(thisRestaurantObject.website);
            
            $('#addSpotH2').addClass('hide');
            $('#addSpot').addClass('hide');

            $('#editSpotH2').removeClass('hide');
            $('#editFriedChicken').removeClass('hide');

            //set this as a global variable
            //we need this to update the user in the updateSpot function
            editFriedChickenId = thisRestaurantObject._id;
         })
    }

    // Update Spot
    function updateSpot(event){
        // Super basic validation - increase errorCount variable if any fields are blank
        var errorCount = 0;
        $('#editFriedChicken input').each(function(index, val) {
            if($(this).val() === '') { errorCount++; }
        });

        // Check and make sure errorCount's still at zero
        if(errorCount === 0) {

            // If it is, compile all spot info into one object
            var editSpot = {
                'restaurantname': $('#editFriedChicken fieldset input#inputRestaurantName').val(),
                'address': $('#editFriedChicken fieldset input#inputAddress').val(),
                'website': $('#editFriedChicken fieldset input#inputWebsite').val()
            }

            // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'PUT',
                data: editSpot,
                url: '/chickenspots/updatefriedchicken/' + editFriedChickenId, //editFriedChickenId is a global variable we set in the editUser function
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
        $('#editSpotH2').addClass('hide');
        $('#editFriedChicken').addClass('hide');

        $('#addSpotH2').removeClass('hide');
        $('#addSpot').removeClass('hide');

        $('#editFriedChicken fieldset input#inputRestaurantName').val('');
        $('#editFriedChicken fieldset input#inputAddress').val('');
        $('#editFriedChicken fieldset input#inputWebsite').val('');
    }

    // Populate the user table on initial page load
    populateTable();

    // Username link click
    $('#friedChickenList table tbody').on('click', 'td a.linkshowspot', showSpotInfo);

    // Add User button click
    $('#btnAddChickenSpot').on('click', addSpot);


    // Delete User link click
    $('#friedChickenList table tbody').on('click', 'td a.linkdeletespot', deleteSpot);

    $('#friedChickenList table tbody').on('click', 'td a.linkeditspot', editSpot);

    $('#btnEditChickenSpot').on('click', updateSpot);

    $('#btnCancelEdit').on('click', hideAndClearEditShowAddForm)


});
