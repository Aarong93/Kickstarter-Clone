var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var CuisinesConstants = require('../constants/restaurant_constants');

var CuisineStore = new Store(AppDispatcher);

var _cuisines = [];

CuisineStore.all = function () {
	return _cuisines.slice(0);
};

CuisineStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case CuisinesConstants.CUISINES_RECEIVED:
			_cuisines = payload.cuisines;
			CuisineStore.__emitChange();
	}
};



module.exports = CuisineStore;
