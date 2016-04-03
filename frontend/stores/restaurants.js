var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');

var _restaurants = {};

var RestaurantStore = new Store(AppDispatcher);

var _addRestaurant = function (restaurant) {
	_restaurants[restaurant.id] = restaurant;
};

RestaurantStore.all = function () {
	return jQuery.extend(true, {}, _restaurants);
};

RestaurantStore.find = function (id) {
	return _restaurants[id];
};

RestaurantStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case RestaurantConstants.RESTAURANT_RECEIVED:
			_addRestaurant(payload.restaurant);
			RestaurantStore.__emitChange();
			break;
	}
};


module.exports = RestaurantStore;
