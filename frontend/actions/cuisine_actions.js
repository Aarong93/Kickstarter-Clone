var CuisinesConstants = require('../constants/restaurant_constants');
var AppDispatcher = require('../dispatcher/dispatcher');

var CuisineActions = {
	receiveCuisines: function (cuisines) {
		AppDispatcher.dispatch({
			actionType: CuisinesConstants.CUISINES_RECEIVED,
			cuisines: cuisines
		});
	},
};



module.exports = CuisineActions;
