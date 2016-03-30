var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var browserHistory = ReactRouter.browserHistory;
var NavBar = require('./components/nav/nav_bar');
var Footer = require('./components/nav/footer_bar');

var App = React.createClass({
  render: function () {
    return (
      <div id="kitchen-starter-app">
        <NavBar />
        {this.props.children}
				<div className="filler" />
				<div className="push" />
				<Footer />
      </div>
    );
  }
});

var router = (
 <Router history={browserHistory}>
   <Route path="/" component={App}>
   </Route>
 </Router>
);

$(function () {
  ReactDOM.render(router, $('#root')[0]);
});
