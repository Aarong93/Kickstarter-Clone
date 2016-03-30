var RestaurantActions = require('../actions/restaurant_actions');



var ApiUtil = {

	fetchRestaurant: function(id) {
		$.ajax({
			type: "GET",
			url: "/api/restaurants/" + id,
			dataType: "json",
			success: function (restaurant) {
				RestaurantActions.receiveRestaurant(restaurant);
			}
		});
	}

};

module.exports = ApiUtil;
