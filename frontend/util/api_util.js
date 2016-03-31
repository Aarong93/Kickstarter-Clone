var RestaurantActions = require('../actions/restaurant_actions');



var ApiUtil = {

	fetchRestaurant: function (id) {
		$.ajax({
			type: "GET",
			url: "/api/restaurants/" + id,
			dataType: "json",
			success: function (restaurant) {
				RestaurantActions.receiveRestaurant(restaurant);
			}
		});
	},

	fetchRestaurantByNameContain: function (str) {
		$.ajax({
			type: "GET",
			url: "/api/restaurants",
			dataType: "json",
			data: {str: str},
			success: function (restaurants) {
				RestaurantActions.receiveRestaurants(restaurants);
			}
		});
	},

};

module.exports = ApiUtil;
