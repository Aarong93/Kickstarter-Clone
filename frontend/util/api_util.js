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

  createRestaurant: function (params, callback, failCallback) {
    $.ajax({
      type: "POST",
      url: "/api/restaurants",
      dataType: "json",
      data: {restaurant: params},
      success: function (restaurant) {
        RestaurantActions.receiveCreatedRestaurant(restaurant);
				callback && callback("/restaurants/edit/" + restaurant.id);
      },
      error: function (errors) {
        failCallback && failCallback(errors);
      }
    });
  },

  patchRestaurantWithImage: function (id, params) {
    $.ajax({
      type: "PATCH",
      url: "/api/restaurants/" + id,
      dataType: "json",
			processData: false,
			contentType: false,
      data: params,
      success: function (restaurant) {
        RestaurantActions.receiveCreatedRestaurant(restaurant);
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
				if (restaurants.search_results) {
        	restaurants = {meta: {}, search_results: restaurants.search_results };
				} else {
					restaurants = {meta: {}, search_results: restaurants}
				}
				RestaurantActions.receiveIndexRestaurants(restaurants);
			}
		});
	},

	fetchRestaurantByNameContain: function (str, page) {
    if (!page) {
      page = 1;
    }
		$.ajax({
			type: "GET",
			url: "/api/restaurants",
			dataType: "json",
			data: {str: str, page: page},
			success: function (restaurants) {
				RestaurantActions.receiveRestaurants(restaurants);
			}
		});
	},

	fetchRestaurantsByCuisine: function (cuisine_id, number) {
		$.ajax({
			type: "GET",
			url: "/api/restaurants",
			dataType: "json",
			data: {cuisine_id: cuisine_id, per: number},
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

	login: function(credentials, callback, failCallback) {
		$.ajax({
			type: "POST",
			url: "/api/session",
			dataType: "json",
			data: credentials,
			success: function(currentUser) {
				SessionActions.currentUserReceived(currentUser);
				callback && callback();
			},
			error: function () {
				failCallback && failCallback();
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

	createUser: function (info, callback, failCallback) {
	  $.ajax({
	    type: "POST",
	    url: "/api/users",
	    dataType: "json",
	    data: {user: info},
	    success: function (currentUser) {
	      SessionActions.currentUserReceived(currentUser, callback);
				callback && callback();
	    },
			error: function (errors) {
				failCallback && failCallback(errors);
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
	},

  createContribution: function(params) {
    $.ajax({
      type: "POST",
      url: "/api/contributions",
      dataType: "json",
      data: {contribution: params},
      success: function (contribution) {
        ApiUtil.fetchRestaurant(contribution.restaurant_id);
      }
    });
  },

  createReward: function(params) {
    $.ajax({
      type: "POST",
      url: "/api/rewards",
      dataType: "json",
      data: {reward: params},
      success: function (reward) {
        ApiUtil.fetchCreatedRestaurant(reward.restaurant_id);
      }
    });
  },

	destroyRestaurant: function(id, callback) {
		$.ajax({
			type: "DELETE",
			url: "/api/restaurants/" + id,
			dataType: "json",
			success: function () {
				callback && callback()
			}

		})
	}

};

module.exports = ApiUtil;
