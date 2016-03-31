var React = require('react');
var PropTypes = React.PropTypes;
var RestaurantSearchStore = require('../../stores/restaurant_search_index');

var SearchIndex = React.createClass({

  //change to restaurants and create index item
  getInitialState: function () {
    return {restaurant: {}};
  },

  onRestaurantSearchStoreChange: function () {
    this.setState({restaurants: RestaurantSearchStore.all()});
  },

  componentDidMount: function () {
    this.listenToken =
      RestaurantSearchStore.addListener(this.onRestaurantSearchStoreChange);
  },

  componentWillUnmount: function () {
    this.listenToken.remove();
  },

  render: function() {
    if (!this.state.restaurant) {
      return <div></div>
    }

    if (this.state.restaurants[0] === "none") {
      return <div>No Results Matching Your Search Were Found</div>
    }
    // this should render index items
    return (
      <div></div>
    );
  }

});

module.exports = SearchIndex;
