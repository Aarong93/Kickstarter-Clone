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
      image_url: this.props.restaurant.image_url || "",
      blurb: this.props.restaurant.blurb || "" ,
      expiration: this.props.restaurant.expiration || "",
      target: this.props.restaurant.target || "",
    }
  },

  data: function () {
    return ({
      title: this.state.title,
      image_url: this.state.image_url,
      blurb: this.state.blurb,
      expiration: this.state.expiration,
      target: this.state.target
    });
  },

  _setChanged: function () {
    this.setState({changed: true});
  },

  _discardChanges: function () {
    this.setState(this.getInitialState());
  },

  render: function() {
    var saveButton = <div id="disabled-save-button" className="save-button">Save Changes</div>;
    var discardChanges = <div id="disabled-discard-button" className="discard-button">Discard Changes</div>
    if (this.state.changed) {
      saveButton = <div className="save-button" onClick={this.props.save}>Save Changes</div>;
      discardChanges = <div className="discard-button" onClick={this._discardChanges}>Discard Changes</div>
    }

    return (
      <div className="edit-form group">
        <label>Title
          <input type="text" onInput={this._setChanged} valueLink={this.linkState('title')} />
        </label>
        <label>Image URL
          <input type="text" onInput={this._setChanged} valueLink={this.linkState('image_url')} />
        </label>
        <label>Blurb
          <textarea onInput={this._setChanged} valueLink={this.linkState('blurb')} />
        </label>
        <label>End Date
          <input type="date" onInput={this._setChanged} valueLink={this.linkState('expiration')} />
        </label>
        <label>Funding Goal
          <input placeholder="$0" type="text" onInput={this._setChanged} valueLink={this.linkState('target')} />
        </label>
        {saveButton}
        {discardChanges}
      </div>

    );
  }

});

module.exports = BasicForm;
