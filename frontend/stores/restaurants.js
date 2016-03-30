var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');

var _restaurants = {};

var RestaurantStore = new Store(AppDispatcher);

var _addRestaurant = function (restaurant) {
	_restaurants[restaurant.id] = restaurant;
};

var _addRestaurants = function (restaurants) {
	for (var i = 0; i < restaurants.length; i++) {
		if (_restaurants[restaurants[id]]) {
			Object.merge(_restaurants[restaurants[i].id], restaurants[i]);
		}
	}

	Object.merge(restaurants, _restaurants);
	_restaurants = restaurants;
};

RestaurantStore.all = function () {
	var return_copy = {};
	Object.assign(return_copy, _restaurants);
	return return_copy;
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
		case RestaurantConstants.RESTAURANT_RECEIVED:
			_addRestaurants(payload.restaurants);
			RestaurantStore.__emitChange();
			break;
	}
};


module.exports = RestaurantStore;
