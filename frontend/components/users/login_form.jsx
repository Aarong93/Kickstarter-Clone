var React = require('react');
var ApiUtil = require('../../util/api_util');
var SessionStore = require('../../stores/session_store');

var LoginForm = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired,
    browserHistoryArray: React.PropTypes.array
  },

  getInitialState: function () {
    return {
      email: "",
      password: "",
			showError: false
    };
  },

	_error: function () {
		if (!this.state.showError){
			return (<div></div>);
		}
		return (
			<div className="errors">
				Invalid Email Address or Password
			</div>
		);
	},

	_showError: function () {
		this.setState({showError: true});
	},

	_loginGuest: function (e) {
		this.setState({email: "guest@gmail.com", password: 'password'}, this.handleSubmit);
	},

  render: function () {
    return (
      <div className="login-page">
				<div className="login-form-wrapper">
					<h1> Log in</h1>
	        <form onSubmit={this.handleSubmit}>
	          <label htmlFor="email"></label>
	          <input placeholder="Email" onChange={this.updateEmail} type="text" value={this.state.email}/>

	          <label htmlFor="password"></label>
	          <input placeholder="Password" onChange={this.updatePassword} type="password" value={this.state.password}/>
						{this._error()}
	          <button id="log-in-button" className="submit-new-restaurant">
							Log me in!
						</button>
						<div id="log-in-button-guest" className="submit-new-restaurant" onClick={this._loginGuest}>
							Log in as guest!
						</div>
            <div className="grey-line" />
            <div className="login-or">or</div>
            <a className="facebook-login" href="/auth/facebook">
              Log in with Facebook
            </a>
            <div className="already-signed-up">
              {"New to KitchenStarter? "}
              <span
              onClick={this.context.router.push.bind(this, '/users/new')}
              className="blue-link">
                Sign up!
              </span>
            </div>
	        </form>
				</div>
      </div>
    );
  },

  handleSubmit: function(e) {
    if (e) {
      e.preventDefault();
    }

		this.setState({showError: false});
    var nextRoute = this.props.location.query.nextRoute;
    if (nextRoute) {
      ApiUtil.login(this.state, this.context.router.push.bind(this, nextRoute), this._showError);
    }
    else {
      var goBack = "/";
      histArr = this.context.browserHistoryArray
      var thisRoute = "/session/new";

      if (histArr.length > 0 &&
         histArr[histArr.length - 1] !== thisRoute &&
         histArr[histArr.length - 1] !== thisRoute + "/")
      {
        goBack = histArr[histArr.length - 1];
      }
      ApiUtil.login(this.state, this.context.router.push.bind(this, goBack), this._showError);
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
