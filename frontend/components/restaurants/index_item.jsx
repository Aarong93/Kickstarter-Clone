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

	componentWillReceiveProps: function (newProps) {
		if (this.props.restaurant.image_url !== newProps.restaurant.image_url) {
			this.setState({imageClass: "hide-image"});
		}
	},

	render: function() {
		var expires = new Date(this.props.restaurant.expiration);
		var today = new Date();
		var daysLeft = Math.round((expires - today)/(1000*60*60*24));
		var style = {backgroundImage: 'url(' + this.props.restaurant.image_url + ')'};

		var percentDone =
			(this.props.restaurant.total/this.props.restaurant.target)*100;
		var progressWidth = {width: (percentDone + "%")};
		if (percentDone > 100) {
			progressWidth = {width: ("100%")};
		}
		var total = this.propsrestaurant.total

		if total > 100000 {
			total = total/1000 + "K"
		}

		return (
			<div className="index-item group" onClick={this.handleClick}>
				<div
					id="index-item-img"
					className={this.state.imageClass}
					style={style}
					/>
				<img id="img-timer" onLoad={this._imageReady} src={this.props.restaurant.image_url}/>
				<div className="index-item-info">
					<h3>{this.props.restaurant.title}</h3>
					<h4>{this.props.restaurant.user.name}</h4>
					<p>{this.props.restaurant.blurb}</p>
				</div>
				<div className="index-item-location">
					<p>
						<i className="fa fa-map-marker" />   {this.props.restaurant.city.name}
					</p>
				</div>
				<div className="progress-bar-wrapper">
					<div style={progressWidth} className="progress-bar" />
				</div>
				<ul className="index-item-stats group">
					<li>{(percentDone).toFixed(2) + "%"}<br /><span className="index-item-stats-label">funded</span></li>
					<li>
							{"$" + total}<br /><span className="index-item-stats-label">pledged</span>
					</li>
					<li>{daysLeft}<br /><span className="index-item-stats-label">days to go</span></li>
				</ul>
			</div>
		);
	}

});

module.exports = IndexItem;
