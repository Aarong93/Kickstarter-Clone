var React = require('react');
var PropTypes = React.PropTypes;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/api_util');
var RestaurantActions = require('../../actions/restaurant_actions');
var RestaurantIndexStore = require('../../stores/restaurant_search_index');

var SearchBar = React.createClass({
	mixins: [LinkedStateMixin],

	getInitialState: function () {
		return {searchVal: ""};
	},

	clearIfSearchEmpty: function () {
		if (RestaurantIndexStore.all().length < 1) {
			this.setState({searchVal: ""});
		}
	},

	componentDidMount: function () {
		this.listener = RestaurantIndexStore.addListener(this.clearIfSearchEmpty);
	},

	componentWillUnmount: function () {
		this.listener.remove();
	},

	searchCallback: function () {
		ApiUtil.fetchRestaurantByNameContain(this.state.searchVal);
	},

	onChange: function (e) {
		clearTimeout(this.searchToken);

		if (e.target.value !== "") {
			this.searchToken = setTimeout(
				this.searchCallback, 500
			);
		} else {
			this.searchToken = RestaurantActions.clearSearchRestaurants();
		}
	},

	render: function() {
		return (
			<div className="searchBar">
				<div id="searchIcon" className="fa fa-search"/>
				<input type="text"
					valueLink={this.linkState('searchVal')}
					placeholder="Search Restaurants"
					onInput={this.onChange}
				/>
			</div>
		);
	}

});

module.exports = SearchBar;
