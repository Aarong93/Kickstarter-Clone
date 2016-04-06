var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var CuisineStore = require('../../stores/cuisines');
var CityStore = require('../../stores/cities');

var NewRestaurant = React.createClass({

  mixins: [LinkedStateMixin],

  contextTypes: {router: React.PropTypes.object.isRequired},

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {selected: {food: ""}, title: "", cuisines: [], showDropdown: false, cities: [], selectedCity: {name: ""}};
  },

  _cuisineChange: function () {
    this.setState({cuisines: CuisineStore.all()});
    this.setState({selected: CuisineStore.all()[0]});
  },

  _cityChange: function () {
    this.setState({cities: CityStore.all()});
    this.setState({selectedCity: CityStore.find('New York').id});
  },

  componentDidMount: function () {
    this.cTokenListener = CuisineStore.addListener(this._cuisineChange);
    this.cityTokenListener = CityStore.addListener(this._cityChange);
    ApiUtil.fetchCuisines();
    ApiUtil.fetchCities();
  },

  componentWillUnmount: function () {
    this.cTokenListener.remove();
    this.cityTokenListener.remove();
  },

  _submit: function (e) {
    e.preventDefault();
    ApiUtil.createRestaurant(
      {cuisine_id: this.state.selected.id, title: this.state.title, city_id: this.state.selectedCity},
      this.context.router.push.bind(this)
    );
  },

  _handleSelector: function (e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({showDropdown: true});
    window.addEventListener('click', this._handleClose);
  },

  _handleClose: function (e) {
    this.setState({showDropdown: false});
    window.removeEventListener('click', this._handleClose);
  },

  _handleSelect: function (cuisine, e) {
    e.preventDefault();
    this.setState({showDropdown: false, selected: cuisine});
  },

  render: function() {
    var cuisines = <option></option>;
    var disabled = "disabled";
    var cities = this.state.cities.map(function (city) {
      return <option key={city.id} value={city.id}>{city.name}</option>;
    });
    if (this.state.title) { disabled = ""; }
    var an = "a";
    if (this.state.selected.food.startsWithVowel()) {
      an = "an";
    }
    var hidden = "hide";
    if (this.state.showDropdown) {
      hidden = "";
      cuisines = this.state.cuisines.map(function (cuisine) {
        return <li key={cuisine.id}
          value={cuisine.id}
          onClick={this._handleSelect.bind(this, cuisine)}
          className="cuisine-option">{cuisine.food}</li>;
      }.bind(this));
    }
    return (
      <div className="new-restaruant-page">
        <div className="new-restaurant-page-content">
          <h1>What are you going to cook?</h1>
          <form onSubmit={this._submit}>
            <div className={"triangle-cuisine-choice-selector" + hidden} />
            <span className="new-restaurant-selector">I want to start {an} </span>
            <div  onClick={this._handleSelector} className="cuisine-selector">
              {this.state.selected.food}<span className='select-arrow fa fa-sort-desc' />
            </div><span className="new-restaurant-selector" >restaurant called<br></br></span>
            <ul className= {"cuisine-choices " + hidden}>
              {cuisines}
            </ul>
            <input type="text" placeholder="name..." valueLink={this.linkState('title')} className="restaurant-name-input" />
            <div className="city-selector-holder group">
              <p>Pick a city</p>
              <select id="city-selector" valueLink={this.linkState('selectedCity')} >
                {cities}
              </select>
            </div>
            <input type="submit" className="submit-new-restaurant" disabled={disabled} value="Create Your Restaurant!" />
          </form>
        </div>
      </div>
    );
  }

});

module.exports = NewRestaurant;
