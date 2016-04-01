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
    return {cuisine_id: "", title: "", cuisines: []};
  },

  _cuisineChange: function () {
    this.setState({cuisines: CuisineStore.all()});
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
    ApiUtil.patchRestaurant({cuisine_id: this.state.cuisine_id, title: this.state.title});
  },

  render: function() {
    var cuisines = <option></option>;
    if (this.state.cuisines.length > 0) {
      cuisines = this.state.cuisines.map(function (cuisine) {
        return <option key={cuisine.id} value={cuisine.id}>{cuisine.food}</option>;
      });
    }
    return (
      <div className="new-restaruant-page">
        <form onSubmit={this._submit}>
          <select valueLink={this.linkState('cuisine_id')} className="cuisineSelector">
            {cuisines}
          </select>
          <label>Restaurant Name:
            <input type="text" valueLink={this.linkState('title')} className="restaurant-name-input"></input>
          </label>
          <input type="submit" value="Save"/>
        </form>
      </div>
    );
  }

});

module.exports = NewRestaurant;
