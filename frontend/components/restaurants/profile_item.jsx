var React = require('react');
var SessionStore = require('../../stores/session_store');
var ApiUtil = require('../../util/api_util');

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

	_delete: function () {
		var self = this;
		var message = "Are you sure you want to delete " + self.props.restaurant.title
		var result = window.confirm(message);

		if (result) {
			ApiUtil.destroyRestaurant(
				self.props.restaurant.id,
				function () {
					ApiUtil.fetchRestaurantByParamsIndexStore({
						user_id: self.props.restaurant.user.id
					})
				}
			);
		}

	},

	render: function() {
    var editText = "Continue Editing";
    var show = <div />;
		var style = {backgroundImage: 'url(' + this.props.restaurant.image_url + ')'};
		var remove = <div className="hide"/>;

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
    } else if (!this.props.restaurant.published) {
			remove =
				<div onClick={this._delete} className="remove-project edit-profile-index-item" >
					Delete
				</div>
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
				{remove}
        {show}
			</div>
		);
	}

});

module.exports = ProfileIndexItem;
