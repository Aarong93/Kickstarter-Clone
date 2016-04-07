var React = require('react');
var PropTypes = React.PropTypes;
var RestaurantIndexStore = require('../../stores/restaurant_index');
var ApiUtil = require('../../util/api_util');
var SessionStore = require('../../stores/session_store');
var ProfileNav = require('./profile_nav');
var RestaurantProfilePageItem = require('../restaurants/profile_item');

var CreatedProjects = React.createClass({

  getInitialState: function () {
    return {restaurants: []};
  },

  componentDidMount: function () {
    this.token = RestaurantIndexStore.addListener(this._onChange);
    ApiUtil.fetchRestaurantByParamsIndexStore({
      user_id: SessionStore.currentUser().id
    });
  },

  componentWillUnmount: function () {
    this.token.remove();
  },

  _onChange: function () {
    this.setState({restaurants: RestaurantIndexStore.all()});
  },

  render: function() {
    var startedRestaurants = [];
    var publishedRestaurants = [];

    if (this.state.restaurants.length > 0) {
      this.state.restaurants.forEach(function (restaurant) {

        if (!restaurant.published) {
          startedRestaurants.push(
          <li key={restaurant.id}>
            <RestaurantProfilePageItem restaurant={restaurant} />
          </li>);
        } else {
          publishedRestaurants.push(
            <li key={restaurant.id}>
              <RestaurantProfilePageItem restaurant={restaurant} />
            </li>);
        }

      });
    }

    return (
      <div className="profile-page">
        <div className="profile-page-content group">
          <div className="group profile-page-header">
            <h1>Created projects</h1>
            <ProfileNav selected="0"/>
          </div>
          <h2>A place to keep track of all your created projects</h2>
          <h3>Started</h3>
          <ul className="project-list group">
            {startedRestaurants}
          </ul>
          <h3>Live</h3>
          <ul className="project-list group">
            {publishedRestaurants}
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = CreatedProjects;
