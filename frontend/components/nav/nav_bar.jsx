var React = require('react');

var NavBar = React.createClass({

	render: function () {
		return (
			<header className="group">
				<h2 className="site-logo group">
					<a href="/">
						KITCHEN<span className="green">STARTER</span>
					</a>
				</h2>
				<ul className="global-nav">
					<li><a href="#">Discover</a></li>
					<li><a href="#">Start a Project</a></li>
					<li><a href="#">About Us</a></li>
				</ul>
				<ul className="login-nav">
					<li><a href="/users/new">Sign up</a></li>
					<li><a href="/session/new">Login</a></li>
				</ul>
			</header>
		);
	}
});

module.exports = NavBar;
