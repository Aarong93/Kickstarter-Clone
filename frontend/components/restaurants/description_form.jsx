var React = require('react');
var PropTypes = React.PropTypes;
var CuisineStore = require('../../stores/cuisines');
var CityStore = require('../../stores/cities');
var ApiUtil = require('../../util/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var DescriptionForm = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {changed: false, description: this.props.restaurant.description}
  },

  data: function () {
    return ({
      description: this.state.description
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
      <div className="edit-form">
        <label>Description
          <textarea id="description-textbox" cols="40" rows="5" onInput={this._setChanged} valueLink={this.linkState('description')} />
        </label>
        {saveButton}
        {discardChanges}
      </div>
    );
  }

});

module.exports = DescriptionForm;
