var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var CuisineStore = require('../../stores/cuisines');

var NewRestaurant = React.createClass({

  mixins: [LinkedStateMixin],

  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {selected: {food: ""}, title: "", cuisines: [], showDropdown: false};
  },

  _cuisineChange: function () {
    this.setState({cuisines: CuisineStore.all()});
    this.setState({selected: CuisineStore.all()[0]});
  },

  componentDidMount: function () {
    this.cTokenListener = CuisineStore.addListener(this._cuisineChange);
    ApiUtil.fetchCuisines();
  },

  componentWillUnmount: function () {
    this.cTokenListener.remove();
  },

  _submit: function (e) {
    e.preventDefault();
    ApiUtil.createRestaurant({cuisine_id: this.state.cuisine_id, title: this.state.title});
  },

  _handleSelector: function (e) {
    e.preventDefault();
    this.setState({showDropdown: true});
    window.addEventListener('click', this._handleClose);
  },

  _handleClose: function (e) {
    debugger
    this.setState({showDropdown: false});
    window.removeEventListener('click', this._handleClose);
  },

  _handleSelect: function (cuisine, e) {
    e.preventDefault();
    this.setState({showDropdown: false, selected: cuisine});
  },

  render: function() {
    var cuisines = <option></option>;
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
            <span className="new-restaurant-selector">I want to start a </span>
            <div  onClick={this._handleSelector} className="cuisine-selector">
              {this.state.selected.food}
            </div><span className="new-restaurant-selector" >restaurant called<br></br></span>
          <ul className= {"cuisine-choices " + hidden}>
              {cuisines}
            </ul>
            <label>Restaurant Name:
              <input type="text" valueLink={this.linkState('title')} className="restaurant-name-input"></input>
            </label>
            <input type="submit" value="Create Your Project!"/>
          </form>
        </div>
      </div>
    );
  }

});

module.exports = NewRestaurant;
