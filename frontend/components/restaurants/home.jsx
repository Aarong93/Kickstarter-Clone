var React = require('react');
var RestaurantStore = require('../../stores/restaurants');
var RestaurantIndexStore = require('../../stores/restaurant_index');
var CuisineStore = require('../../stores/cuisines');
var ApiUtil = require('../../util/api_util');
var CityStore = require('../../stores/cities');
var IndexItem = require('./index_item');

var Home = React.createClass({

	contextTypes: {router: React.PropTypes.object.isRequired},

	getInitialState: function () {
		return ({
			restaurant: {},
			imageClass: "hide-image",
      selected: {id: 0},
      indexRestaurants: [],
      cuisines: []
		});
	},

	componentDidMount: function () {
    this.cTokenListener = CuisineStore.addListener(this._cuisineChange);
    this.rTokenListener = RestaurantStore.addListener(this._onChange);
    this.rcTokenListener = RestaurantIndexStore.addListener(this._onSelectedChange)
		ApiUtil.fetchRestaurantByParams({featured: true});
    ApiUtil.fetchCuisines();
	},

  _onSelectedChange: function () {
    this.setState({indexRestaurants: [RestaurantIndexStore.all()[0], RestaurantIndexStore.all()[1]]});
  },

	_onChange: function () {
		this.setState({restaurant: RestaurantStore.get()});
	},

  _cuisineChange: function () {
    var cuisines = CuisineStore.all();
    this.setState({cuisines: cuisines});
    this.setState({selected: cuisines[0]});
    ApiUtil.fetchRestaurantByParamsIndexStore({cuisine_id: cuisines[0].id, featured: true});
  },

	componentWillUnmount: function () {
    this.cTokenListener.remove();
    this.rTokenListener.remove();
    this.rcTokenListener.remove();
	},

	_imageReady: function () {
		this.setState({imageClass: "show-image"});
	},

  _selectCuisine: function(cuisine) {
    this.setState({selected: cuisine});
    ApiUtil.fetchRestaurantByParamsIndexStore({cuisine_id: cuisine.id, featured: true});
  },

  _bannerButton: function () {
    this.context.router.push("/restaurants/" + this.state.restaurant.id);
  },

	render: function () {
    var cuisines = <div></div>;
    if (!this.state.restaurant.image_url) {
      return <div id="home-page" />
    }
    if (this.state.cuisines.length > 0) {
      var klass = "";
      cuisines = this.state.cuisines.map(function (cuisine) {
        klass = ""
        if (this.state.selected.id === cuisine.id) {
          klass = "selected-cuisine-home";
        }
        return (<li id={klass} onClick={this._selectCuisine.bind(this, cuisine)} key={cuisine.id}>{cuisine.food}</li>)
      }.bind(this));
    }
    var indexRestaurants = <div></div>;
    if (this.state.indexRestaurants[1]) {
      indexRestaurants =
        [<div key="1" id="home-page-index-item-wrapper" className="index-item-wrapper-small">
          <IndexItem restaurant={this.state.indexRestaurants[0]} />
        </div>,
        <div key="2" id="home-page-index-item-wrapper" className="index-item-wrapper-small">
          <IndexItem restaurant={this.state.indexRestaurants[1]} />
        </div>];
    }
    var style = {backgroundImage: 'url(' + this.state.restaurant.image_url + ')'};
    return (
      <div id="home-page">
        <div className="home-page-image-wrapper">
          <div className={this.state.imageClass} style={style}>
            <h1 className="home-page-title">{this.state.restaurant.title}</h1>
            <h2 className="home-page-description">{this.state.restaurant.blurb}</h2>
            <div id="home-page-button" className="submit-new-restaurant" onClick={this._bannerButton}>Learn More</div>
          </div>
        </div>
        <img id="img-timer" onLoad={this._imageReady} src={this.state.restaurant.image_url}/>
        <div className="home-page-index-area group">
          <div className="project-index-item-area group">
            <h3>Featured {this.state.selected.food} Restaurants</h3>
            {indexRestaurants}
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
