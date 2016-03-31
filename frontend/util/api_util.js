var RestaurantActions = require('../actions/restaurant_actions');
var CuisineActions = require('../actions/cuisine_actions');

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

	fetchRestaurantsByCuisine: function (cuisine_id) {
		$.ajax({
			type: "GET",
			url: "/api/restaurants",
			dataType: "json",
			data: {cuisine_id: cuisine_id},
			success: function (restaurants) {
				RestaurantActions.receiveIndexRestaurants(restaurants);
			}
		});
	},

	fetchCuisines: function () {
		$.ajax({
			type: "GET",
			url: "/api/cuisines",
			dataType: "json",
			success: function (cuisines) {
				CuisineActions.receiveCuisines(cuisines);
			}
		});
	}

};

module.exports = ApiUtil;
