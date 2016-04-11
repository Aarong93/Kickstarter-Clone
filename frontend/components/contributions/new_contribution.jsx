var React = require('react');
var PropTypes = React.PropTypes;
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ApiUtil = require('../../util/api_util');

var NewContribution = React.createClass({

  getInitialState: function () {
    var selectedReward = this.props.reward;
    selectedReward = selectedReward || "None";
    return { selectedReward: selectedReward, amount: ""};
  },

  mixins: [LinkedStateMixin],

  _handleSubmit: function (e) {
    e.preventDefault();
    var reward_id = 0;

    if (this.state.selectedReward != "None") {
      reward_id = this.state.selectedReward;
    }

    ApiUtil.createContribution({
      reward_id: reward_id,
      value: this.state.amount,
      restaurant_id: this.props.restaurant.id
    });

    this.props.close();
  },

  render: function() {

    var rewards =
      this.props.restaurant.rewards.map(function (reward) {
        return (<option key={reward.id} value={reward.id}>{reward.name}</option>);
      });

    var minVal = 1;
    var rewardsProp = this.props.restaurant.rewards;

    for (var i = 0; i < rewardsProp.length; i++) {
      if (rewardsProp[i].id === parseInt(this.state.selectedReward)) {
        minVal = rewardsProp[i].min_dollar_amount;
      }
    }

    var disabled = false;

    if (minVal > parseInt(this.state.amount) || !this.state.amount) {
      disabled = true;
    }

    return (
      <div className="new-contribution-form">
        <form onSubmit={this._handleSubmit}>
          <input type="text" valueLink={this.linkState('amount')} placeholder="0..." />
          <label>Reward:</label>
          <select id="reward-selector" valueLink={this.linkState('selectedReward')}>
            <option value={0}>None</option>
            {rewards}
          </select>
          <br></br>
          <p className="min-contribution-text">
            {"(minimum contribution for this reward is $" + minVal + ")"}
          </p>
          <input type="submit" id="contribute-button" disabled={disabled} className="save-button" value="Contribute!"/>
        </form>
      </div>
    );
  }

});

module.exports = NewContribution;
