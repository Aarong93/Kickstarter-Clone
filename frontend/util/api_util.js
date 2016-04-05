var RestaurantActions = require('../actions/restaurant_actions');
var CuisineActions = require('../actions/cuisine_actions');
var SessionActions = require('../actions/session_actions');
var CityActions = require('../actions/city_actions');

var ApiUtil = {

	fetchRestaurant: function (id, callback) {
		$.ajax({
			type: "GET",
			url: "/api/restaurants/" + id,
			dataType: "json",
			success: function (restaurant) {
				RestaurantActions.receiveRestaurant(restaurant);
			},
			error: function () {
				callback && callback({published: false});
			}
		});
	},

  createRestaurant: function (params, callback) {
    $.ajax({
      type: "POST",
      url: "/api/restaurants",
      dataType: "json",
      data: {restaurant: params},
      success: function (restaurant) {
        RestaurantActions.receiveCreatedRestaurant(restaurant);
				callback && callback("/restaurants/edit/" + restaurant.id);
      }
    });
  },

  patchRestaurant: function (id, params) {
    $.ajax({
      type: "PATCH",
      url: "/api/restaurants/" + id,
      dataType: "json",
      data: {restaurant: params},
      success: function (restaurant) {
        RestaurantActions.receiveCreatedRestaurant(restaurant);
      }
    });
  },

  fetchCreatedRestaurant: function (id, callback) {
    $.ajax({
      type: "GET",
      url: "/api/restaurants/" + id,
      dataType: "json",
			data: {edit: true},
      success: function (restaurant) {
        RestaurantActions.receiveCreatedRestaurant(restaurant);
      },
			error: function () {
				callback && callback();
			}
    });
  },

	fetchRestaurantByParams: function (params) {
		$.ajax({
			type: "GET",
			url: "/api/restaurants",
			dataType: "json",
			data: params,
			success: function (restaurant) {
				RestaurantActions.receiveRestaurant(restaurant);
			}
		});
	},

	fetchRestaurantByParamsIndexStore: function (params) {
		$.ajax({
			type: "GET",
			url: "/api/restaurants",
			dataType: "json",
			data: params,
			success: function (restaurants) {
				RestaurantActions.receiveIndexRestaurants(restaurants);
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

	logout: function(callback) {
		$.ajax({
			type: "DELETE",
			url: "/api/session",
			dataType: "json",
			success: function() {
				SessionActions.logout();
	      callback && callback();
			}
		});
	},

	createUser: function (info, callback) {
	  $.ajax({
	    type: "POST",
	    url: "/api/users",
	    dataType: "json",
	    data: {user: info},
	    success: function(currentUser) {
	      SessionActions.currentUserReceived(currentUser, callback);
				callback && callback();
	    }
	  });
	},

	fetchCurrentUser: function(completion) {
		$.ajax({
			type: "GET",
			url: "/api/session",
			dataType: "json",
			success: function(currentUser) {
	      if (currentUser.message !== "Not logged in") {
	        SessionActions.currentUserReceived(currentUser);
	      }
			},
	    complete: function() {
	      completion && completion();
	    }
		});
	},

	fetchCities: function() {
		$.ajax({
			type: "GET",
			url: "/api/cities",
			dataType: "json",
			success: function (cities) {
				CityActions.receiveCities(cities);
			}
		});
	}

};

module.exports = ApiUtil;
