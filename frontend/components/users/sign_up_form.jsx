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
      password: "",
			showError: false,
			errorMessage: ""
    };
  },

	_error: function () {
		if (!this.state.showError){
			return (<div></div>);
		}
		var messages =
			this.state.errorMessage.map(function (message) {
				return (<div key={message}><p>{message}</p><br /></div>);
			});

		return (
			<div className="errors">
				{messages}
			</div>
		);
	},

	_showError: function (errorMessage) {
		this.setState({
			showError: true,
			errorMessage: errorMessage.responseJSON
		});
	},

  _loginGuest: function (e) {
    e.preventDefault();
    ApiUtil.login(
      {email: "guest@gmail.com", password: "password"},
      this.context.router.goBack.bind(this)
    );
  },

  render: function() {
    return (
      <div className="login-page">

				<div className="login-form-wrapper">
					<h1>Sign up</h1>
	        <form onSubmit={this.handleSubmit}>
	          <label htmlFor="email"></label>
	          <input placeholder="Email" onChange={this.updateEmail} type="text" value={this.state.email}/>

	          <label htmlFor="name"></label>
	          <input placeholder="Name" onChange={this.updateName} type="text" value={this.state.name}/>

	          <label htmlFor="password"></label>
	          <input placeholder="Password" onChange={this.updatePassword} type="password" value={this.state.password}/>
						{this._error()}
	          <button id="log-in-button" className="submit-new-restaurant">
							Sign me up!
						</button>
            <div id="log-in-button-guest" className="submit-new-restaurant" onClick={this._loginGuest}>
              Sign in as guest!
            </div>
            <div className="grey-line" />
            <div className="login-or">or</div>
            <a className="facebook-login" href="/auth/facebook">
              Log in with Facebook
            </a>
            <div className="already-signed-up">
              {"Have an account? "}
              <span
              onClick={this.context.router.push.bind(this, '/session/new')}
              className="blue-link">
                Log in
              </span>
            </div>
	        </form>
				</div>
			</div>
    );
  },

  handleSubmit: function(e) {
    e.preventDefault();
		this.setState({showError: false});
    ApiUtil.createUser(this.state, this.context.router.goBack.bind(this), this._showError);
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
