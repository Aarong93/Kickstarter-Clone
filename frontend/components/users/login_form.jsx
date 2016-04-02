var React = require('react');
var ApiUtil = require('../../util/api_util');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      email: "",
      password: ""
    };
  },

  render: function() {
    return (
      <div>
        <h1>Please Log in</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input onChange={this.updateEmail} type="text" value={this.state.email}/>

          <label htmlFor="password">Password</label>
          <input onChange={this.updatePassword} type="password" value={this.state.password}/>

          <button>Submit</button>
        </form>
      </div>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var nextRoute = this.props.location.query.nextRoute;
    if (nextRoute) {
      ApiUtil.login(this.state, this.context.router.push.bind(this, nextRoute));
    }
    else {
      ApiUtil.login(this.state, this.context.router.goBack.bind(this));
    }
  },

  updateEmail: function(e) {
    this.setState({ email: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  }

});

module.exports = LoginForm;
