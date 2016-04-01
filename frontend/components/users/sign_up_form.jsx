var React = require('react');
var ApiUtil = require('../../util/api_util');

var SignUpForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      email: "",
      name: "",
      password: ""
    };
  },

  render: function() {
    return (
      <div>
        <h1>Please Sign Up</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input onChange={this.updateEmail} type="text" value={this.state.email}/>

          <label htmlFor="email">Name</label>
          <input onChange={this.updateName} type="text" value={this.state.name}/>

          <label htmlFor="password">Password</label>
          <input onChange={this.updatePassword} type="password" value={this.state.password}/>

          <button>Submit</button>
        </form>
      </div>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
    ApiUtil.createUser(this.state, this.context.router.goBack.bind(this));
  },

  updateEmail: function(e) {
    this.setState({ email: e.currentTarget.value });
  },

  updateName: function(e) {
    this.setState({ name: e.currentTarget.value });
  },

  updatePassword: function(e) {
    this.setState({ password: e.currentTarget.value });
  }

});

module.exports = SignUpForm;
