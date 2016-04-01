var RestaurantActions = require('../actions/restaurant_actions');
var CuisineActions = require('../actions/cuisine_actions');
var SessionActions = require('../actions/session_actions');

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
	},

	login: function(credentials, callback) {
	$.ajax({
		type: "POST",
		url: "/api/session",
		dataType: "json",
		data: credentials,
		success: function(currentUser) {
			SessionActions.currentUserReceived(currentUser);
			callback && callback();
		}
	});
},

logout: function() {
	$.ajax({
		type: "DELETE",
		url: "/api/session",
		dataType: "json",
		success: function() {
			SessionActions.logout();
		}
	});
},

fetchCurrentUser: function(completion) {
	$.ajax({
		type: "GET",
		url: "/api/session",
		dataType: "json",
		success: function(currentUser) {
			SessionActions.currentUserReceived(currentUser);
		},
		complete: function() {
			completion && completion();
		}
	});
}

};

module.exports = ApiUtil;
