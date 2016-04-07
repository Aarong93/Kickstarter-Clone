var React = require('react');
var CuisineStore = require('../../stores/cuisines');
var ApiUtil = require('../../util/api_util');

var FooterBar = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return {cuisines: []};
  },

  componentDidMount: function () {
    CuisineStore.addListener(this._onChange);
    ApiUtil.fetchCuisines();
  },

  _onChange: function () {
    this.setState({cuisines: CuisineStore.all()});
  },

  _indexLink: function(cuisine, e) {
    e.preventDefault();
    var query = $.param({selected: cuisine.id});
    this.context.router.push('/restaurants/?' + query);
  },

	render: function () {
    var cuisines = <div></div>;

    if (this.state.cuisines.length > 0) {
      cuisines =
        this.state.cuisines.map(function(cuisine) {
          return(<li key={cuisine.id} onClick={this._indexLink.bind(this, cuisine)}>{cuisine.food}</li>);
        }.bind(this));
    }

		return (
			<footer className="group">
				<div className="footer-content group">
          <div id="footer-col-1">
  					<h3 className="footer-about-us group">About us</h3>
              <ul className="footer-about-us-list">
                <li>
                  What is KitchenStarter?
                </li>
              </ul>
          </div>
          <div id="footer-col-2">
					<h3 className="footer-discover">Discover</h3>
            <ul className="footer-discover-list">
              {cuisines}
            </ul>
          </div>
          <div id="footer-col-3" className="group">
            <h3 className="footer-contact">Contact me</h3>
  					<ul className="footer-my-info">
  						<li><a href="mailto:aaron.r.grau@gmail.com">Aaron.r.grau@gmail.com</a></li>
  						<li><a href="https://www.linkedin.com/in/aaronrgrau">LinkedIn</a></li>
  						<li><a href="https://github.com/Aarong93/KitchenStarter-A-Kick-Starter-Clone">Github</a></li>
  					</ul>
          </div>
				</div>
			</footer>
		);
	}
});

module.exports = FooterBar;
