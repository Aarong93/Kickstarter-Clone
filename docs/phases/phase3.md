### Phase 3: Flux Architecture and Router (3 days)

## Flux
### Views (React Components)
* RestaurantIndex
  - RestaurantIndexItem
* Show Restaurant
* Contribute Form
* Restaurant creation form

### Stores
* RestaurantStore
* RewardsStore

### Actions
* RestaurantActions.receiveAllRestaurants
* RestaurantActions.receiveSingleRestaurant
* RestaurantActions.deleteRestaurant
* InvestmentActions.receivedContributions
* (same for rewards)

### ApiUtil
* ApiUtil.fetchAllRestaurants
* ApiUtil.fetchSingleRestaurant
* ApiUtil.createRestaurant
* ApiUtil.editRestaurant
* ApiUtil.destroyRestaurant
* (same for rewards)

## Gems/Libraries
* Flux Dispatcher (npm)
* React/ReactRouter (npm)
* (googleMaps API for location?)
