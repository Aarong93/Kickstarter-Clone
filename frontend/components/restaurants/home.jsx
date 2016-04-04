var React = require('react');
var RestaurantStore = require('../../stores/restaurants');
var ApiUtil = require('../../util/api_util');


var Home = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return ({
			restaurant: {},
			imageClass: "hide-image"
		});
	},

	componentDidMount: function () {
		this.listenerToken = RestaurantStore.addListener(this._onChange);
		ApiUtil.fetchRestaurantByParams({featured: true});
	},

	_onChange: function () {
		this.setState({restaurant: RestaurantStore.get()});
	},

	componentWillUnmount: function () {
		this.listenerToken.remove();
	},

	_imageReady: function () {
		this.setState({imageClass: "show-image"});
	},


	render: function () {
    if (!this.state.restaurant.image_url) {
      return <div id="home-page" />
    }

    return (
      <div id="home-page">
        <div className="home-page-image-wrapper">
          <img className={this.state.imageClass} src={this.state.restaurant.image_url} onLoad={this._imageReady} />
        </div>
      </div>
    );
	}

});

module.exports = Home;
