var RestaurantConstants = require('../constants/restaurant_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var RestaurantActions = {
	receiveRestaurant: function (restaurant) {
		AppDispatcher.dispatch({
			actionType: RestaurantConstants.RESTAURANT_RECEIVED,
			restaurant: restaurant
		});
	}
};


module.exports = RestaurantActions;
