var React = require('react');
var PropTypes = React.PropTypes;


var ProfileNav = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  _handleCreatedClick: function (e) {
    this.context.router.push('/profile/projects');
  },

  _handleBackedClick: function (e) {
    this.context.router.push('/profile/backed');
  },

  render: function() {
    var backedClass = "";
    var createdClass = "";
    if (this.props.selected === "0") {
      createdClass = "selected";
    } else {
      backedClass = "selected";
    }

    return (
      <nav className="profile-nav">
        <ul>
          <li id={createdClass} onClick={this._handleCreatedClick}>Created Projects</li>
          <li id={backedClass} onClick={this._handleBackedClick}>Backed Projects</li>
        </ul>
      </nav>
    );
  }

});

module.exports = ProfileNav;
