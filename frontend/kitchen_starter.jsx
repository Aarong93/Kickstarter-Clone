var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;

var NavBar = require('./components/nav/nav_bar');
var Footer = require('./components/nav/footer_bar');
var RestaurantShow = require('./components/restaurants/restaurant_show');
var SearchIndex = require('./components/restaurants/search_index');
var RestaurantIndex = require('./components/restaurants/index');
var LoginForm = require('./components/users/login_form.jsx');
var SignUpForm = require('./components/users/sign_up_form');
var RestaurantNew = require('./components/restaurants/new_restaurant');
var RestaurantEdit = require('./components/restaurants/edit_restaurant');

var SessionStore = require('./stores/session_store');
var ApiUtil = require('./util/api_util');
var RestaurantActions = require('./actions/restaurant_actions.js');

var App = React.createClass({

  render: function () {
    return (
      <div id="kitchen-starter-app">
        <NavBar />
        <SearchIndex size="small" />
        {this.props.children}
				<Footer />
      </div>
    );
  }

});

var router = (
 <Router history={browserHistory} onUpdate={_onUpdate}>
   <Route path="/" component={App} onEnter={_onLoad}>
     <Route path="/session/new" component={LoginForm} onEnter={_alreadyLoggedIn}/>
     <Route path="/users/new" component={SignUpForm} onEnter={_alreadyLoggedIn}/>
		 <Route path="/restaurants" component={RestaurantIndex} />
     <Route path="/restaurants/new" component={RestaurantNew} onEnter={_requireLoggedIn} />
     <Route path="/restaurants/edit/:id" component={RestaurantEdit} onEnter={_requireLoggedIn} />
		 <Route path="/restaurants/:id" component={RestaurantShow} />
   </Route>
 </Router>
);

$(function () {
  ReactDOM.render(router, $('#root')[0]);
});

function _onLoad(nextState, replace, asyncCompletionCallback) {
  ApiUtil.fetchCurrentUser(asyncCompletionCallback);
}

function _onUpdate() {
  RestaurantActions.clearSearchRestaurants();
  window.scrollTo(0, 0);
}


function _requireLoggedIn(nextState, replace, asyncCompletionCallback) {
  var requestRoute = nextState.routes[nextState.routes.length-1].path;
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.fetchCurrentUser(_redirectIfNotLoggedIn.bind(null, replace, asyncCompletionCallback, requestRoute));
  } else {
    _redirectIfNotLoggedIn(replace, asyncCompletionCallback);
  }
}

function _alreadyLoggedIn(nextState, replace, asyncCompletionCallback) {
  if (!SessionStore.currentUserHasBeenFetched()) {
    ApiUtil.fetchCurrentUser(_redirectIfLoggedIn.bind(null, replace, asyncCompletionCallback));
  } else {
    _redirectIfLoggedIn(replace, asyncCompletionCallback);
  }
}

function _redirectIfLoggedIn(replace, callback) {
  if (SessionStore.isLoggedIn()) {
    replace("/");
  }

  callback();
}


function _redirectIfNotLoggedIn(replace, callback, requestRoute) {
  var query = $.param({nextRoute: requestRoute});
  var path = "/session/new/?" + query;

  if (!SessionStore.isLoggedIn()) {
    replace(path);
  }

  callback();
}
