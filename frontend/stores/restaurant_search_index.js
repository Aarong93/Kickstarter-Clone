var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');

var _restaurants = [];

var RestaurantIndexStore = new Store(AppDispatcher);


var _newRestaurants = function (restaurants) {
  if (restaurants.length === 0) {
    _restaurants = ["none"];
  } else {
    _restaurants = restaurants;
  }
};

RestaurantIndexStore.all = function () {
  return _restaurants.slice(0);
};

RestaurantIndexStore.find = function (id) {
	return _restaurants[id];
};

RestaurantIndexStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case RestaurantConstants.RESTAURANTS_RECEIVED:
			_newRestaurants(payload.restaurants);
			RestaurantIndexStore.__emitChange();
			break;
    case RestaurantConstants.CLEAR_SEARCH_RESTAURANTS:
      _restaurants = [];
      RestaurantIndexStore.__emitChange();
      break;
	}
};


module.exports = RestaurantIndexStore;
