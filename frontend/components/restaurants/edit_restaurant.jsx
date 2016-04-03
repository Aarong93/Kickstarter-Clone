var React = require('react');
var PropTypes = React.PropTypes;
var CuisineStore = require('../../stores/cuisines');
var CityStore = require('../../stores/cities');
var RestaurantEditStore = require('../../stores/restaurant_create');


var EditRestaurant = React.createClass({

  render: function() {
    return (
      <div id="edit-restaurant-page"/>
    );
  }

});

module.exports = EditRestaurant;
