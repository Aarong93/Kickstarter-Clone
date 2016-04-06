var React = require('react');
var PropTypes = React.PropTypes;
var CuisineSelector = require('../cuisines/selector');
var RestaurantIndexStore = require('../../stores/restaurant_index');
var IndexItem = require('./index_item');
var ApiUtil = require('../../util/api_util');

var RestaurantIndex = React.createClass({

	getInitialState: function () {
		return {restaurants: []};
	},

	componentDidMount: function () {
		this.listenToken = RestaurantIndexStore.addListener(this.handleChange);
	},

	componentWillUnmount: function () {
		this.listenToken.remove();
	},

	handleChange: function () {
		this.setState({restaurants: RestaurantIndexStore.all()});
	},

	nextPage: function () {
		var meta = RestaurantIndexStore.meta();
		ApiUtil.fetchRestaurantsByCuisine(meta.query, meta.per + 9);
	},

	render: function() {
		var restaurants;

		if (this.state.restaurants.length < 1) {
			restaurants = <div />;
		} else {
			restaurants = this.state.restaurants.map(function (restaurant) {
				return (
					<div key={restaurant.id} className="index-item-wrapper-small">
						<IndexItem
							restaurant={restaurant}
							/>
					</div>
				);
			});
		}

		var loadMoreClass = "";

		if (RestaurantIndexStore.all().length >= RestaurantIndexStore.meta().total_count) {
			loadMoreClass = "disabled";
		}

		return (
			<div className="restaurant-index-page group">
				<div className="restaurant-index group">
					<CuisineSelector selected={{id: this.props.location.query.selected}} />
	        <div className="restaurant-index-holder group">
					  {restaurants}
	        </div>
				</div>
					<div className={loadMoreClass + " load-more-button"} onClick={this.nextPage}>Load More</div>
			</div>
		);
	}

});

module.exports = RestaurantIndex;
