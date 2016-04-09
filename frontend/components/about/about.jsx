var React = require('react');
var PropTypes = React.PropTypes;

var About = React.createClass({

  render: function() {
    return (
      <div className="about-page">
        <div className="about-page-content">
          <h1>
            What is KitchenStarter?
          </h1>
          <p>
            KitchenStarter is a KickStarter clone built using
            a Rails backend and a React.js frontend. <br />
          </p>
          <p>
            KitchenStarter allows
            users to create projects in order to request funding for new restaurant ideas.<br></br>
            Users can search for, view, and contribute to other users projects.
          </p>

          <h3>Contact Me</h3>
          <ul>
            <li>
              <a href="mailto:aaron.r.grau@gmail.com">
                Aaron.r.grau@gmail.com
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/aaronrgrau">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/Aarong93/KitchenStarter-A-Kick-Starter-Clone">
                Project Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

});

module.exports = About;
