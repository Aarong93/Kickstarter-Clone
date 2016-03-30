var React = require('react');
var enhanceWithClickOutside = require('react-click-outside');

var YouPopout = React.createClass({
	mixins: [require('react-onclickoutside')],

	_signOut: function (e) {
		e.preventDefault();
	},


	handleClickOutside: function () {
		this.props.handleExitClick();
  },

	render: function() {
		return (
			<div id="you-popout">
				<div className="you-popout-col group">
					<h3>Your Links</h3>
					<ul>
						<li>Backed Projects</li>
					</ul>
					<a href="#" onClick={this._signOut}>Sign Out</a>
				</div>
			</div>
		);
	}

});

module.exports = enhanceWithClickOutside(YouPopout);
