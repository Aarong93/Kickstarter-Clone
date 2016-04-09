var React = require('react');
var SessionStore = require('../../stores/session_store');

var ProfileIndexItem = React.createClass({
	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

	getInitialState: function () {
		return {imageClass: "hide-image"};
	},

	_imageReady: function () {
		this.setState({imageClass: "show-image"});
	},

	handleEditClick: function () {
    this.context.router.push("/restaurants/edit/" + this.props.restaurant.id);
	},

  handleShowClick: function () {
    this.context.router.push("/restaurants/" + this.props.restaurant.id);
  },

	render: function() {
    var editText = "Continue Editing";
    var show = <div />;
		var style = {backgroundImage: 'url(' + this.props.restaurant.image_url + ')'};

    if (this.props.restaurant.published) {
      show =
        <div id="show-index-item" className="edit-profile-index-item" onClick={this.handleShowClick}>
          Show
        </div>;
      editText = "Edit";
    }

    var edit =
      <div className="edit-profile-index-item" onClick={this.handleEditClick}>
        {editText}
      </div>;

    if (this.props.restaurant.user.id !== SessionStore.currentUser().id) {
      edit = <div className="hide"/>;
    }

		return (
			<div className="profile-index-item">
				<img id="img-timer" onLoad={this._imageReady} src={this.props.restaurant.image_url}/>
        <div className="profile-index-item-image-wrapper">
  				<div
  					id="profile-index-item-img"
						style={style}
  					className={this.state.imageClass}
  					/>
        </div>
				<h3>{this.props.restaurant.title}</h3>
        {edit}
        {show}
			</div>
		);
	}

});

module.exports = ProfileIndexItem;
