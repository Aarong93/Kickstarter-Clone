var React = require('react');
var RestaurantStore = require('../../stores/restaurants');
var CuisineStore = require('../../stores/cuisines');
var ApiUtil = require('../../util/api_util');
var CityStore = require('../../stores/cities');


var Home = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return ({
			restaurant: {},
			imageClass: "hide-image",
      cuisines: []
		});
	},

	componentDidMount: function () {
    this.cTokenListener = CuisineStore.addListener(this._cuisineChange);
    this.rTokenListener = RestaurantStore.addListener(this._onChange);
		ApiUtil.fetchRestaurantByParams({featured: true});
    ApiUtil.fetchCuisines();
	},

	_onChange: function () {
		this.setState({restaurant: RestaurantStore.get()});
	},

  _cuisineChange: function () {
    this.setState({cuisines: CuisineStore.all()});
    this.setState({selected: CuisineStore.all()[0]});
  },

	componentWillUnmount: function () {
    this.cTokenListener.remove();
    this.rTokenListener.remove();
	},

	_imageReady: function () {
		this.setState({imageClass: "show-image"});
	},


	render: function () {
    var cuisines = <div></div>;
    if (!this.state.restaurant.image_url) {
      return <div id="home-page" />
    }
    if (this.state.cuisines.length > 0) {
      cuisines = this.state.cuisines.map(function (cuisine) {
        <li>cuisine.food</li>
      }.bind(this));
    }
    var style = {backgroundImage: 'url(' + this.state.restaurant.image_url + ')'};
    return (
      <div id="home-page">
        <div className="home-page-image-wrapper">
          <div className={this.state.imageClass} style={style}>
          </div>
        </div>
        <img id="img-timer" onLoad={this._imageReady} src={this.state.restaurant.image_url}/>
        <div className="home-page-index-area group">
          <div className="project-index-item-area">

          </div>
          <div className="cuisine-selector-area">
            <ul>
              {cuisines}
            </ul>
          </div>
        </div>
      </div>
    );
	}

});

module.exports = Home;
