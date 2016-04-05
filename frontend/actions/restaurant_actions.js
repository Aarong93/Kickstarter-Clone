var RestaurantConstants = require('../constants/restaurant_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var RestaurantActions = {
	receiveRestaurant: function (restaurant) {
		AppDispatcher.dispatch({
			actionType: RestaurantConstants.RESTAURANT_RECEIVED,
			restaurant: restaurant
		});
	},

	receiveRestaurants: function (restaurants) {
		AppDispatcher.dispatch({
			actionType: RestaurantConstants.RESTAURANTS_RECEIVED,
			restaurants: restaurants
		});
	},

	clearSearchRestaurants: function () {
		AppDispatcher.dispatch({
			actionType: RestaurantConstants.CLEAR_SEARCH_RESTAURANTS
		});
	},

	receiveIndexRestaurants: function (restaurants) {
		AppDispatcher.dispatch({
			actionType: RestaurantConstants.RESTAURANT_INDEX_RECEIVED,
			restaurants: restaurants.search_results,
			meta: restaurants.meta
		});
	},

  receiveCreatedRestaurant: function (restaurant) {
    AppDispatcher.dispatch({
      actionType: RestaurantConstants.CREATED_RESTAURANT_RECEIVED,
      restaurant: restaurant
    });
  }
};


module.exports = RestaurantActions;
