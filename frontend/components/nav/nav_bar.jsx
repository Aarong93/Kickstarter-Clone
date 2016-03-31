var React = require('react');
var YouPopout = require('./you_popout');
var SearchBar = require('./search_bar');
var NavBar = React.createClass({

	getInitialState: function () {
		return {expandYou: false};
	},

	_logo: function () {
		return (
			<h2 className="site-logo group">
				<a href="/" >
					<span className="dark-green">KITCHEN</span><span className="green">STARTER</span>
				</a>
			</h2>
		);
	},

	_nav: function () {
		return (
			<ul className="global-nav">
				<li><a href="/restaurants">Discover</a></li>
				<li><a href="#">Start a Project</a></li>
				<li><a href="#">About Us</a></li>
			</ul>
		);
	},

	_handleYouPopoutExitClick: function () {
		this.setState({expandYou: false});
	},

	_youModal: function () {
		if (this.state.expandYou) {
			return (
				<YouPopout
					handleExitClick={this._handleYouPopoutExitClick}
					disableOnClickOutside={true}
				/>
			);
		} else {
			return ("");
		}
	},

	_youClick: function (e) {
		this.setState({expandYou: !this.state.expandYou});
	},

	render: function () {
		var accountTab;
		var loggedIn = true;
		if (!loggedIn) {//placeholder for logged in
			accountTab = (
				<ul className="login-nav">
					<li><a href="/users/new">Sign up</a></li>
					<li><a href="/session/new">Login</a></li>
				</ul>
			);
		} else {
			accountTab = (
				<ul className="login-nav-me">
					<li>
						<div onClick={this._youClick}>
							You <span className='my-arrow fa fa-sort-desc' />
						</div>
						{this._youModal()}
					</li>
				</ul>
			);
		}
		return (
			<header className="group">
				{this._logo()}
				{this._nav()}
				<SearchBar />
				{accountTab}
			</header>
		);
	}
});

module.exports = NavBar;
