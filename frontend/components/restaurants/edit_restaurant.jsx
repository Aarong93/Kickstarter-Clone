var React = require('react');
var PropTypes = React.PropTypes;
var CuisineStore = require('../../stores/cuisines');
var CityStore = require('../../stores/cities');
var ApiUtil = require('../../util/api_util');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var RestaurantEditStore = require('../../stores/restaurant_create');
var BasicsForm = require('./basic_form');
var DescriptionForm = require('./description_form.jsx');
var Modal = require('react-modal');
var SessionStore = require('../../stores/session_store');

$(function(){
  var appElement = $('#root')[0];
  Modal.setAppElement(appElement);
})

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


var EditRestaurant = React.createClass({

  contextTypes: {router: React.PropTypes.object.isRequired},

  getInitialState: function () {
    return {active: 0, restaurant: {}, cities: [], cuisines: [], modalIsOpen: false, clickedTab: 0};
  },


  openModal: function(tab) {
    this.setState({modalIsOpen: true, clickedTab: tab});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  _cuisineChange: function () {
    this.setState({cuisines: CuisineStore.all()});
  },

  _cityChange: function () {
    this.setState({cities: CityStore.all()});
  },

  _restaurantChange: function () {
    this.setState({restaurant: RestaurantEditStore.get()});
  },

  componentDidMount: function () {
    this.cuisineToken = CuisineStore.addListener(this._cuisineChange);
    this.cityToken = CityStore.addListener(this._cityChange);
    this.restaurantToken = RestaurantEditStore.addListener(this._restaurantChange);
    ApiUtil.fetchCuisines();
    ApiUtil.fetchCities();
    ApiUtil.fetchCreatedRestaurant(this.props.params.id, this.redirectIfNotCreator);
  },

  redirectIfNotCreator: function () {
    if (SessionStore.currentUser().id !== RestaurantEditStore.get().user.id) {
      this.context.router.push('/');
    }
  },

  componentWillUnmount: function () {
    this.cuisineToken.remove();
    this.cityToken.remove();
    this.restaurantToken.remove();
  },

  _save: function () {
    ApiUtil.patchRestaurant(this.state.restaurant.id, this.refs.curForm.data());
    this.refs.curForm.setState({changed: false});
  },

  _selectTab: function (e) {
    e.preventDefault();
    if (e.target.value !== this.state.active){
      if (this.refs.curForm.state.changed) {
        this.openModal(e.target.value);
      } else {
        this.setState({active: e.target.value});
      }
    }
  },

  _tabs: function () {
    var lis = [];
    var lisText = ['Basics' ,'Rewards', 'Description'];
    var selected;
    for (var i = 0; i < 3; i++) {
      selected = "";
      if (this.state.active === i) {
        selected = "selected-tab"
      }
      lis.push(
        <li key={i} id={selected} onClick={this._selectTab} value={i}>
          {lisText[i]}
        </li>
      );
    }
    return (
      <ul className="edit-restaurant-tabs group">
        {lis}
      </ul>
    );
  },

  _saveModal: function () {
    this.closeModal();
    this._save()
    this.setState({active: this.state.clickedTab});
  },

  _discardModal: function () {
    this.closeModal();
    this.setState({active: this.state.clickedTab});
  },

  _launch: function () {
    ApiUtil.patchRestaurant(this.state.restaurant.id, {published: true});
    this.context.router.push("/restaurants/" + this.state.restaurant.id);
  },

  render: function() {
    var form = <div />;
    if (this.state.restaurant.id && this.state.cities.length > 0 && this.state.cuisines.length > 0) {
      if (this.state.active === 0) {
        form = <BasicsForm ref="curForm"
            restaurant={this.state.restaurant}
            cities={this.state.cities}
            cuisinies={this.state.cuisines}
            save={this._save}
          />
      } else if (this.state.active === 1) {
        form = <div>Coming Soon</div>
      } else if (this.state.active === 2) {
        form = <DescriptionForm ref="curForm"
          restaurant={this.state.restaurant}
          save={this._save}
          />
      }
    }


    var modal = <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={modalStyles} >
            <h2 id="modal-header">You have unsaved changes</h2>
            <div id="modal-x" className="search-exit-button fa fa-times" onClick={this.closeModal} />
            <div className="save-button" onClick={this._saveModal}>Save Changes</div>
            <div className="discard-button" onClick={this._discardModal}>Discard Changes</div>
            </Modal>

    var launch = <div id="disabled-launch" className="launch-button">Launch!</div>;

    if (
      this.state.restaurant.title &&
      this.state.restaurant.blurb &&
      this.state.restaurant.target &&
      this.state.restaurant.expiration &&
      this.state.restaurant.description &&
      this.state.restaurant.image_url &&
      !this.state.restaurant.published
    ) {
      launch = <div onClick={this._launch} className="launch-button">Launch!</div>;
    }

    return (
      <div id="edit-restaurant-page">
        {modal}
        <div id="edit-restaurant-page-content">
          {this._tabs()}
          {launch}
          <div className="edit-restaurant-page-form-wrapper group">
            {form}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = EditRestaurant;
