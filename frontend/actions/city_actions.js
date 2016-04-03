var CityConstants = require('../constants/city_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var CityActions = {
	receiveCities: function (cities) {
		AppDispatcher.dispatch({
			actionType: CityConstants.CITIES_RECEIVED,
			cities: cities
		});
	},
};



module.exports = CityActions;
