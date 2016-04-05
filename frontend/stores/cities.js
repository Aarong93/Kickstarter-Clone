var Store = require('flux/utils').Store;
var AppDispatcher = require('../dispatcher/dispatcher');
var CityConstants = require('../constants/city_constants');
var HelperUtil = require('../util/helper_util');

var CityStore = new Store(AppDispatcher);

var _cities = [];

CityStore.all = function () {
	return _cities.slice(0);
};

CityStore.find = function (str) {
	for (var i = 0; i < _cities.length; i++) {
		if (_cities[i].name === str) {
			return jQuery.extend(true, {}, _cities[i]);
		}
	}

	return {};
};

CityStore.__onDispatch = function (payload) {
	switch (payload.actionType) {
		case CityConstants.CITIES_RECEIVED:
			_cities = payload.cities;
			CityStore.__emitChange();
	}
};



module.exports = CityStore;
