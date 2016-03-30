var React = require('react');
var PropTypes = React.PropTypes;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/api_util');


var SearchBar = React.createClass({
	mixins: [LinkedStateMixin],

	getInitialState: function () {
		return {searchVal: "", displayIndex: false};
	},

	searchCallback: function () {
		ApiUtil.fetchRestaurantByNameContain(this.state.searchVal);
		this.setState({dispayIndex: true});
	},

	onChange: function (e) {
		clearTimeout(this.searchToken);

		if (e.target.value !== "") {
			this.searchToken = setTimeout(
				this.searchCallback,1000
			);
		} else {
			this.setState({displayIndex: false});
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
