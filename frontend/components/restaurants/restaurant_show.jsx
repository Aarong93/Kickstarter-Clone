var React = require('react');
var RestaurantStore = require('../../stores/restaurants');
var ApiUtil = require('../../util/api_util');
var ImageSideBar = require('./image_side_bar');
var RewardsIndex = require('../rewards/reward_index');

var RestaurantShow = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return ({
			restaurant: {},
			imageClass: "hide-image"
		});
	},

	componentDidMount: function () {
		this.listenerToken = RestaurantStore.addListener(this._onChange);
		ApiUtil.fetchRestaurant(parseInt(this.props.params.id), this.redirectIfNotPublished);
	},

	componentWillReceiveProps: function (newProps) {
		ApiUtil.fetchRestaurant(parseInt(newProps.params.id));
	},

	redirectIfNotPublished: function (restaurant) {
		if (!restaurant.published){
			this.context.router.push('/');
		}
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

	_mainShow: function () {
		var style = {backgroundImage: 'url(' + this.state.restaurant.image_url + ')'};
		return (
				<div className="restaurant-show-main-content group">
					<div className="restaurant-show-main-image image_wrapper group">
						<div
							style={style}
							className={this.state.imageClass}
							id="show-page-image"
						></div>
						<img id="img-timer" onLoad={this._imageReady} src={this.state.restaurant.image_url}/>
					</div>
						<ImageSideBar restaurant={this.state.restaurant}/>
            <div className="group city-cuisine-show">
              <p>
                <i className="fa fa-map-marker" />   {this.state.restaurant.city.name}
              </p>
              <p>
                {this.state.restaurant.cuisine.food}
              </p>
            </div>
            <p className="blurb-show">
              {this.state.restaurant.blurb}
            </p>
				</div>
		);
	},

  _descriptionArea: function () {
    return (
      <div className="restaurant-description-content">
        <div className="restaurant-description">
          <h2>About this project</h2>
          {this.state.restaurant.description}
        </div>
        <div className="restaurant-rewards-show group">
          <h2>Rewards</h2>
          <RewardsIndex rewards={this.state.restaurant.rewards}/>
        </div>
      </div>
    );
  },

	render: function () {
		if (!this.state.restaurant.id) {
			return <div className="restaurant-show-page"></div>;
		}
		return (
			<div className="restaurant-show-page group">
				<div className="restaurant-show-page-content group">
					<h1>{this.state.restaurant.title}</h1>
					<h4>
						by <span className="user-name">
						{this.state.restaurant.user.name}

						</span>
					</h4>
					{this._mainShow()}
          {this._descriptionArea()}
				</div>
			</div>
		);
	}

});

module.exports = RestaurantShow;
