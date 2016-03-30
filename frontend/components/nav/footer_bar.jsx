var React = require('react');

var FooterBar = React.createClass({

	render: function () {
		return (
			<footer className="group">
				<div className="footer-content group">
					<h3 className="footer-about-us group">About us</h3>
					<h3 className="footer-discover">Discover</h3>
					<h3 className="footer-contact">Contact me</h3>
					<ul className="footer-about-us-list">
						<li>
							<a href="#">
								What is KitchenStarter?
							</a>
						</li>
					</ul>
					<ul className="footer-discover-list">
						<li><a href="#">Italian</a></li>
						<li><a href="#">French</a></li>
						<li><a href="#">Indian</a></li>
						<li><a href="#">Tapas</a></li>
						<li><a href="#">Mexican</a></li>
					</ul>
					<ul className="footer-my-info">
						<li><a href="#">Aaron.r.grau@gmail.com</a></li>
						<li><a href="#">LinkedIn</a></li>
						<li><a href="#">Github</a></li>
					</ul>
				</div>
			</footer>
		);
	}
});

module.exports = FooterBar;
