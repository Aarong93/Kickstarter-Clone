var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');
var HelperUtil = require('../util/helper_util');

var _restaurants = [];

var RestaurantIndexPageStore = new Store(AppDispatcher);


RestaurantIndexPageStore.all = function () {
  return _restaurants.slice(0);
};

RestaurantIndexPageStore.find = function (id) {
	return _restaurants[id];
};

RestaurantIndexPageStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case RestaurantConstants.RESTAURANT_INDEX_RECEIVED:
			_restaurants = payload.restaurants;
			RestaurantIndexPageStore.__emitChange();
			break;
	}
};


module.exports = RestaurantIndexPageStore;
