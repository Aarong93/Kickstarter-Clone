var React = require('react');

var IndexItem = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function () {
		return {imageClass: "hide-image"};
	},

	_imageReady: function () {
		this.setState({imageClass: "show-image"});
	},

	handleClick: function () {
		this.props.callback && this.props.callback();
		this.context.router.push("/restaurants/" + this.props.restaurant.id);
	},

	render: function() {
		var expires = new Date(this.props.restaurant.expiration);
		var today = new Date();
		var daysLeft = Math.round((expires - today)/(1000*60*60*24));

		var percentDone =
			(this.props.restaurant.total/this.props.restaurant.target)*100;
		var progressWidth = {width: (percentDone + "%")};
		if (percentDone > 100) {
			progressWidth = {width: ("100%")};
		}
		return (
			<div className="index-item" onClick={this.handleClick}>
				<img
					id="index-item-img"
					src={this.props.restaurant.image_url}
					onLoad={this._imageReady}
					className={this.state.imageClass}
					/>
				<div className="index-item-info">
					<h3>{this.props.restaurant.title}</h3>
					<h4>{this.props.restaurant.user.name}</h4>
					<p>{this.props.restaurant.blurb}</p>
				</div>
				<div className="index-item-location">
					<p>{this.props.restaurant.city.name}</p>
				</div>
				<div className="progress-bar-wrapper">
					<div style={progressWidth} className="progress-bar" />
				</div>
				<ul className="index-item-stats group">
					<li>{percentDone + "%"}<br /><span className="index-item-stats-label">funded</span></li>
					<li>
							{"$" + this.props.restaurant.total}<br /><span className="index-item-stats-label">pledged</span>
					</li>
					<li>{daysLeft}<br /><span className="index-item-stats-label">left</span></li>
				</ul>
			</div>
		);
	}

});

module.exports = IndexItem;
