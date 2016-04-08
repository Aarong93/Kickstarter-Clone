var React = require('react');
var PropTypes = React.PropTypes;
var RestaurantSearchStore = require('../../stores/restaurant_search_index');
var IndexItem = require('./index_item');
var RestaurantActions = require('../../actions/restaurant_actions');
var ApiUtil = require('../../util/api_util');

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

  _changePage: function (val) {
    var meta = RestaurantSearchStore.meta();
    var page = meta.page + val;
    if (page > meta.total_pages) {
      page = 1;
    } else if (page === 0) {
      page = meta.total_pages;
    }
    ApiUtil.fetchRestaurantByNameContain(meta.query, page);
  },

  componentWillUnmount: function () {
    this.listenToken.remove();
  },

  render: function() {
    if (!this.state.restaurants || !this.state.restaurants[0]) {
      return <div></div>;
    }

    if (this.state.restaurants[0] === "none") {
      return (
				<div className="no-search-results">
					<p>No Restaurants Matching Your Search Were Found</p>
				</div>
			);
    }

		var restaurants = this.state.restaurants.map(function (restaurant) {
			return (
				<div key={restaurant.id} className="index-item-wrapper-small">
					<IndexItem
						restaurant={restaurant} callback={RestaurantActions.clearSearchRestaurants}
					/>
				</div>
			);
		});

    return (
			<div className="search-dropdown">
	      <div className="search-results group">
					<div
						className="search-exit-button fa fa-times" onClick={RestaurantActions.clearSearchRestaurants}
						 />
           <div onClick={this._changePage.bind(this, -1)} id="left-angle-bracket">
             <i className="fa fa-angle-left" />
           </div>
           <div onClick={this._changePage.bind(this, 1)} id="right-angle-bracket">
             <i className="fa fa-angle-right" />
           </div>
					{restaurants}
	      </div>
			</div>
    );
  }

});

module.exports = SearchIndex;
