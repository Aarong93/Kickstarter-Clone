var React = require('react');
var PropTypes = React.PropTypes;
var LinkedStateMixin = require('react-addons-linked-state-mixin');

var NewContribution = React.createClass({

  mixins: [LinkedStateMixin],

  render: function() {
    return (
      <div className="new-contribution-form">
        <form>
          <input type="text" placeholder="amount..." ></input>
        </form>
      </div>
    );
  }

});

module.exports = NewContribution;
