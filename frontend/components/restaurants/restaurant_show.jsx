var React = require('react');
var RestaurantStore = require('../../stores/restaurants');
var ApiUtil = require('../../util/api_util');
var ImageSideBar = require('./image_side_bar');

var RestaurantShow = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return ({
			restaurant: RestaurantStore.find(this.props.params.id),
			imageClass: "hide-image"
		});
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

	_imageReady: function () {
		this.setState({imageClass: "show-image"});
	},

	render: function () {
		if (!this.state.restaurant) {
			return <div className="restaurant-show-page"></div>;
		}
		return (
			<div className="restaurant-show-page">
				<div className="restaurant-show-page-content group">
					<h1>{this.state.restaurant.title}</h1>
					<h4>
						by <span className="user-name">
							{this.state.restaurant.user.name}
						</span>
					</h4>
					<div className="restaurant-show-main-image image_wrapper">
						<img
							src={this.state.restaurant.image_url}
							onLoad={this._imageReady}
							className={this.state.imageClass}
						/>
					</div>
					<ImageSideBar />
				</div>
			</div>
		);
	}

});

module.exports = RestaurantShow;
