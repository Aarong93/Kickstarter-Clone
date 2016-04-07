var React = require('react');
var PropTypes = React.PropTypes;

var RewardsIndex = React.createClass({

  getInitialState: function () {
    return ({rewards: this.props.rewards});
  },

  _onClick: function (e) {
    e.preventDefault();
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({rewards: newProps.rewards});
  },

  render: function() {
    if (!this.props.rewards) {
      return (<div></div>);
    }

    var onClick = this._onClick;
    var klass = "";
    if (this.props.onClick) {
      onClick = this.props.onClick.bind(null, reward);
      klass = "hover-rewards-index";
    }

    var rewards =
      this.state.rewards.map(function (reward) {
        return (
          <li className={klass} key={reward.id} onClick={onClick}>
            <h2>Pledge ${reward.min_dollar_amount} or more</h2>
            <h3>{reward.name}</h3>
            <p>{reward.description}</p>
          </li>
        );
      });

    if (this.state.rewards.length < 1) {
      rewards = <div>No Rewards</div>;
    }
    return (
      <div className="rewards-index group">
        <ul className="rewards-list">
          {rewards}
        </ul>
      </div>
    );
  }

});

module.exports = RewardsIndex;
