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
var SearchIndex =require('./components/restaurants/search_index');
var RestaurantIndex = require('./components/restaurants/index');


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
 <Router history={browserHistory}>
   <Route path="/" component={App}>
		 <Route path="/restaurants" component={RestaurantIndex} />
		 <Route path="/restaurants/:id" component={RestaurantShow} />
   </Route>
 </Router>
);

$(function () {
  ReactDOM.render(router, $('#root')[0]);
});
