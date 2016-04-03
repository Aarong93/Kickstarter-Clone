var React = require('react');
var PropTypes = React.PropTypes;
var CuisineSelector = require('../cuisines/selector');
var RestaurantIndexStore = require('../../stores/restaurant_index');
var IndexItem = require('./index_item');
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



		return (
			<div className="restaurant-index-page">
				<div className="restaurant-index group">
					<CuisineSelector />
	        <div className="restaurant-index-holder group">
					  {restaurants}
	        </div>
				</div>
			</div>
		);
	}

});

module.exports = RestaurantIndex;
