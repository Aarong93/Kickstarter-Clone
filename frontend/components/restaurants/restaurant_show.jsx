var React = require('react');
var RestaurantStore = require('../../stores/restaurants');
var ApiUtil = require('../../util/api_util');


var RestaurantShow = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return {restaurant: RestaurantStore.find(this.props.params.id)};
	},

	componentDidMount: function () {
		this.listenerToken = RestaurantStore.addListener(this._onChange);
		ApiUtil.fetchRestaurant(parseInt(this.props.params.id));
	},

	_onChange: function () {
		this.setState({restaurant: RestaurantStore.find(this.props.params.id)});
	},

	componentWillUnmount: function () {
		this.listenerToken.remove();
	},

	render: function () {
		if (!this.state.restaurant) {
			return <div className="restaurant-show-page"></div>;
		}
		return (
			<div className="restaurant-show-page">
				<h1>{this.state.restaurant.title}</h1>
			</div>
		);
	}

});

module.exports = RestaurantShow;
