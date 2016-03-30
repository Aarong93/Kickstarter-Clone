var React = require('react');


var ImageSideBar = React.createClass({

	_clickHandler: function (e) {
		e.preventDefault();
	},

	render: function() {
		var expires = new Date(this.props.restaurant.expiration);
		var today = new Date();

		return (
			<div className="show-image-side-bar">
				<ul className="show-image-side-bar-list">
					<li>
						<h5>
							{this.props.restaurant.number_contributions}
						</h5>
					</li>
					<li>
						<p>
							contributions
						</p>
					</li>

					<li>
						<h5>
								{"$" + this.props.restaurant.total}
						</h5>
					</li>
					<li>
						<p>
							{"pledged of $" + this.props.restaurant.target + " goal"}
						</p>
					</li>

					<li>
						<h5>
							{
								Math.round((expires - today)/(1000*60*60*24))
							}
						</h5>
					</li>
					<li>
						<p>
							days to go
						</p>
					</li>
				</ul>
				<div onClick={this._clickHandler} className="show-back-this-button">
					Back This Restaurant
				</div>
			</div>
		);
	}

});

module.exports = ImageSideBar;
