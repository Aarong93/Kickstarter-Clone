var AppDispatcher = require('../dispatcher/dispatcher');
var SessionConstants = require('../constants/session_constants');

var SessionActions = {
  currentUserReceived: function(currentUser, callback) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.CURRENT_USER_RECEIVED,
      currentUser: currentUser,
      callback: callback
    });
  },

  logout: function() {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
  }
};

module.exports = SessionActions;
