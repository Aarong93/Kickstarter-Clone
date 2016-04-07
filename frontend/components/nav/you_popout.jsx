var React = require('react');
var enhanceWithClickOutside = require('react-click-outside');
var ApiUtils = require('../../util/api_util');

var YouPopout = React.createClass({
	mixins: [require('react-onclickoutside')],

	contextTypes: {router: React.PropTypes.object.isRequired},

	_signOut: function (e) {
		e.preventDefault();
		this.props.closeCB();
		ApiUtils.logout(this.context.router.push.bind(this, '/session/new'));
	},

	handleClickOutside: function () {
		this.props.handleExitClick();
  },

  _backedRestaurants: function () {
    this.props.closeCB();
    this.context.router.push('/profile/backed');
  },

  _createdRestaurants: function () {
    this.props.closeCB();
    this.context.router.push('/profile/projects');
  },

	render: function() {
		return (
			<div id="you-popout">
				<div className="you-popout-col group">
					<h3>Your Links</h3>
					<ul>
						<li onClick={this._createdRestaurants}>Created Restaurants</li>
            <li onClick={this._backedRestaurants}>Backed Restaurants</li>
					</ul>
					<p>Signed in as<br /> <span id="logged-in-name">{this.props.name}</span></p>
					<a href="#" onClick={this._signOut}>Sign Out</a>
				</div>
			</div>
		);
	}

});

module.exports = enhanceWithClickOutside(YouPopout);
