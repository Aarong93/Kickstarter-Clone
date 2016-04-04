var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');

var _restaurant = {};

var RestaurantStore = new Store(AppDispatcher);

var _addRestaurant = function (restaurant) {
	_restaurant = restaurant;
};

RestaurantStore.get = function () {
	return jQuery.extend(true, {}, _restaurant);
};

RestaurantStore.find = function () {
	return _restaurant;
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
