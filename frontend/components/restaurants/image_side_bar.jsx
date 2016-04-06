var React = require('react');
var SessionStore = require('../../stores/session_store');
var Modal = require('react-modal');
var ContributionForm = require('../contributions/new_contribution');

$(function(){
  var appElement = $('#root')[0];
  Modal.setAppElement(appElement);
});

var modalStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width                 : '330px',
  }
};

var ImageSideBar = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
     return {modalIsOpen: false};
  },

	_clickHandler: function (e) {
		e.preventDefault();
    if (!SessionStore.isLoggedIn()) {
      this.context.router.push('/session/new');
    } else {
      this.openModal();
    }
	},

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },


	render: function() {
		var expires = new Date(this.props.restaurant.expiration);
		var today = new Date();

    var modal = (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={modalStyles} >
        <div id="modal-x" className="search-exit-button fa fa-times" onClick={this.closeModal} />
        <h2 id="modal-header">Make a contribution</h2>
        <ContributionForm restaurant={this.props.restaurant}/>
      </Modal>
    );

		return (
			<div className="show-image-side-bar">
        {modal}
				<ul className="show-image-side-bar-list">
					<li>
						<h5>
							{this.props.restaurant.number_contributions}
						</h5>
					</li>
					<li>
						<p>
							contributions
						</p>
					</li>

					<li>
						<h5>
								{"$" + this.props.restaurant.total}
						</h5>
					</li>
					<li>
						<p>
							{"pledged of $" + this.props.restaurant.target + " goal"}
						</p>
					</li>

					<li>
						<h5>
							{
								Math.round((expires - today)/(1000*60*60*24))
							}
						</h5>
					</li>
					<li>
						<p>
							days to go
						</p>
					</li>
				</ul>
				<div onClick={this._clickHandler} className="show-back-this-button">
					Back This Restaurant
				</div>
			</div>
		);
	}

});

module.exports = ImageSideBar;
