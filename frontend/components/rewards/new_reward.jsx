var React = require('react');
var PropTypes = React.PropTypes;
var RewardsIndex = require('./reward_index');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/api_util');
var Helper = require('../../util/helper_util');

var NewRewardForm = React.createClass({

  mixins: [LinkedStateMixin],

  getInitialState: function () {
    return {changed: false, name: "", cost: "", description: ""};
  },

  _handleSubmit: function (e) {
    e.preventDefault();
    ApiUtil.createReward({
      name: Helper.toTitleCase(this.state.name),
      min_dollar_amount: parseInt(this.state.cost),
      description: this.state.description,
      restaurant_id: this.props.restaurant.id
    });
    this.setState(this.getInitialState);
  },

  render: function() {
    var disabled = true;
    var klass = "";

    if (this.state.name && this.state.cost >= 1 && this.state.description) {
      disabled = false;
    }

    if (disabled) {
      klass = "disabled";
    }
    return (
      <div className="new-rewards-form edit-form group">
        <h3>New Reward</h3>
        <form className="edit-form group" onSubmit={this._handleSubmit}>
          <label>Title
            <input type="text" placeholder="Title..." valueLink={this.linkState("name")}></input>
          </label>
          <label>Pledge amount
            <input type="text" placeholder="$1 minimum" valueLink={this.linkState("cost")}></input>
          </label>
          <label>Description
            <textarea id="new-reward-description" placeholder="What are contributors getting?" valueLink={this.linkState("description")} />
          </label>
          <input className={klass + " add-reward-button"} disabled={disabled} type="submit" value="Add Reward!" />
        </form>
        <h3 id="existing-rewards">Existing Rewards</h3>
        <RewardsIndex rewards={this.props.restaurant.rewards} />
      </div>
    );
  }

});

module.exports = NewRewardForm;
