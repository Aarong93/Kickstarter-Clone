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

		return (
			<div className="index-item" onClick={this.handleClick}>
				<img
					id="index-item-img"
					src={this.props.restaurant.image_url}
					onLoad={this._imageReady}
					className={this.state.imageClass}
				/>
				<h3>{this.props.restaurant.title}</h3>
				<h4>by {this.props.restaurant.user.name}</h4>
			</div>
		);
	}

});

module.exports = IndexItem;
