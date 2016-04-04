var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var RestaurantConstants = require('../constants/restaurant_constants');
var HelperUtil = require('../util/helper_util');

var _restaurant = {};

var RestaurantCreateStore = new Store(AppDispatcher);


RestaurantCreateStore.get = function () {
  return jQuery.extend(true, {}, _restaurant);
};


RestaurantCreateStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case RestaurantConstants.CREATED_RESTAURANT_RECEIVED:
      _restaurant = payload.restaurant;
			RestaurantCreateStore.__emitChange();
			break;
	}
};


module.exports = RestaurantCreateStore;
