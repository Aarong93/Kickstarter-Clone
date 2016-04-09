var React = require('react');
var PropTypes = React.PropTypes;
var CuisineStore = require('../../stores/cuisines');
var CityStore = require('../../stores/cities');
var ApiUtil = require('../../util/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var BasicForm = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {
      changed: false,
      title: this.props.restaurant.title,
      imageUrl: this.props.restaurant.image_url || null,
			imageFile: null,
      blurb: this.props.restaurant.blurb || "" ,
      expiration: this.props.restaurant.expiration || "",
      target: this.props.restaurant.target || "",
			imageClass: "hide-image"
    };
  },

	_imageReady: function () {
		this.setState({imageClass: "show-image"});
	},

  data: function () {
		var formData = new FormData();

		formData.append("restaurant[title]", this.state.title);
		if (this.state.imageFile) {
					formData.append("restaurant[image]", this.state.imageFile);
		}
		formData.append("restaurant[blurb]", this.state.blurb);
		formData.append("restaurant[expiration]", this.state.expiration);
		formData.append("restaurant[target]", this.state.target);

    return (formData);
  },

  _setChanged: function () {
    this.setState({changed: true});
  },

  _discardChanges: function () {
    this.setState(this.getInitialState(), this.setState.bind(this, {imageClass: "show-image"}));
  },

	handleFileChange: function (e) {
		var file = e.currentTarget.files[0];
		var reader = new FileReader();

		reader.onloadend = function () {
			var result = reader.result;
			this.setState({ imageFile: file, imageUrl: result, changed: true });
		}.bind(this);

		reader.readAsDataURL(file);
	},

  render: function() {
    var saveButton = <div id="disabled-save-button" className="save-button">Save Changes</div>;
    var discardChanges = <div id="disabled-discard-button" className="discard-button">Discard Changes</div>;
    if (this.state.changed) {
      saveButton = <div placeholder="dd/mm/yyyy" className="save-button" onClick={this.props.save}>Save Changes</div>;
      discardChanges = <div className="discard-button" onClick={this._discardChanges}>Discard Changes</div>;
    }

    return (
      <div className="edit-form group">
        <label>Title
          <input type="text" onInput={this._setChanged} valueLink={this.linkState('title')} />
        </label>
        <label>Upload a New Image
					<input id="file-input"
						type="file"

        		onChange={this.handleFileChange}
						/>
        </label>
        <label>Current Image
					<img onLoad={this._imageReady}
						className={this.state.imageClass}
						src={this.state.imageUrl} />
        </label>
        <label>Blurb
          <textarea placeholder="Describe your restaurant in one sentence..." onInput={this._setChanged} valueLink={this.linkState('blurb')} />
        </label>
        <label>End Date
          <input type="date" onInput={this._setChanged} valueLink={this.linkState('expiration')} />
        </label>
        <label>Funding Goal
          <input placeholder="$0..." type="text" onInput={this._setChanged} valueLink={this.linkState('target')} />
        </label>
        {saveButton}
        {discardChanges}
      </div>

    );
  }

});

module.exports = BasicForm;
