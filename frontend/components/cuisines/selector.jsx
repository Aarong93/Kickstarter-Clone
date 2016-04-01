var React = require('react');
var PropTypes = React.PropTypes;
var CuisineStore = require('../../stores/cuisines');
var ApiUtil = require('../../util/api_util');


var CuisineSelector = React.createClass({

	getInitialState: function () {
		return {cuisines: [], selected: {}};
	},

	handleChange: function () {
		this.setState({cuisines: CuisineStore.all()});
	},

	select: function(cuisine) {
		this.state.selected = cuisine;
		ApiUtil.fetchRestaurantsByCuisine(cuisine.id);
	},

	componentDidMount: function () {
		this.listenToken = CuisineStore.addListener(this.handleChange);
		ApiUtil.fetchCuisines();
	},

	componentWillUnmount: function () {
		this.listenToken.remove();
	},

	render: function() {
		return(
			<div className="cuisine-options group">
				{this.renderListItems()}
			</div>
		);
	},

	renderListItems: function() {
	 var items = [];
	 if (this.state.cuisines.length < 0) {
		 return <div />;
	 }

	 for (var i = 0; i < this.state.cuisines.length; i++) {
		 var item = this.state.cuisines[i];
     var selected = "";
     if (item.id === this.state.selected.id) {
       selected = "selected";
     }
		 items.push(<div key={item.id} className={"cuisine-selection-item " + selected} onClick={this.select.bind(null, item)}>
				<span>{item.food}</span>
		 </div>);
	  }
		return items;
 	}


});

module.exports = CuisineSelector;
