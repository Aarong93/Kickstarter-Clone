var React = require('react');
var PropTypes = React.PropTypes;
var CuisineStore = require('../../stores/cuisines');
var CityStore = require('../../stores/cities');
var ApiUtil = require('../../util/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var RestaurantEditStore = require('../../stores/restaurant_create');


var EditRestaurant = React.createClass({
  mixins: [LinkedStateMixin],

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return {active: 0, restaurant: {}, cities: [], cuisines: [], changed: {changed: false}};
  },

  _cuisineChange: function () {
    this.setState({cuisines: CuisineStore.all()});
  },

  _cityChange: function () {
    this.setState({cities: CityStore.all()});
  },

  _restaurantChange: function () {
    this.setState({restaurant: RestaurantEditStore.get()});
  },

  componentDidMount: function () {
    this.cuisineToken = CuisineStore.addListener(this._cuisineChange);
    this.cityToken = CityStore.addListener(this._cityChange);
    this.restaurantToken = RestaurantEditStore.addListener(this._restaurantChange);
    ApiUtil.fetchCuisines();
    ApiUtil.fetchCities();
    ApiUtil.fetchCreatedRestaurant(this.props.params.id);
  },

  componentWillUnmount: function () {
    this.cuisineToken.remove();
    this.cityToken.remove();
    this.restaurantToken.remove();
  },

  _selectTab: function (e) {
    e.preventDefault();
    this.setState({active: e.target.value});
  },

  _tabs: function () {
    var lis = [];
    var lisText = ['Basics' ,'Rewards', 'Description'];
    var selected;
    for (var i = 0; i < 3; i++) {
      selected = "";
      if (this.state.active === i) {
        selected = "selected-tab"
      }
      lis.push(
        <li key={i} id={selected} onClick={this._selectTab} value={i}>
          {lisText[i]}
        </li>
      );
    }
    return (
      <ul className="edit-restaurant-tabs group">
        {lis}
      </ul>
    );
  },

  render: function() {
    var form;
    if (this.state.active === 0) {
      form = <div></div>
    } else if (this.state.active === 1) {
      form = <div></div>
    } else if (this.state.active === 2) {
      form = <div></div>
    }
    return (
      <div id="edit-restaurant-page">
        <div id="edit-restaurant-page-content">
          {this._tabs()}
          <div className="edit-restaurant-page-form-wrapper">
            {form}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = EditRestaurant;
