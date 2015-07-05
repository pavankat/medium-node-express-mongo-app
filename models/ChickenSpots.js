var mongoose = require('mongoose');

var ChickenSpotSchema = new mongoose.Schema({
  restaurantname: String,
  address: String,
  website: String
});

mongoose.model('ChickenSpot', ChickenSpotSchema);