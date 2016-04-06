var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');
var HelperUtil = require('../util/helper_util');

var _restaurants = [];
var _meta = {};

var RestaurantIndexPageStore = new Store(AppDispatcher);


RestaurantIndexPageStore.all = function () {
  return _restaurants.slice(0);

};

RestaurantIndexPageStore.find = function (id) {
	return _restaurants[id];
};

RestaurantIndexPageStore.meta = function (id) {
	return $.extend(true, {}, _meta);
};

RestaurantIndexPageStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case RestaurantConstants.RESTAURANT_INDEX_RECEIVED:
			_restaurants = payload.restaurants;
			_meta = payload.meta;
			RestaurantIndexPageStore.__emitChange();
			break;
	}
};


module.exports = RestaurantIndexPageStore;
