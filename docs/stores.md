# Flux Stores

### RestaurantsStore

Holds all persisted restaurant project data.

##### Actions:
- `receiveAllRestaurants`
- `receiveSingleRestaurant` (will include rewards data + detailed description)
- `removeRestaurant`

##### Listeners:
- `RestaurantIndex` (passes to `NoteIndexItem` via props)
- `RestaurantDetail`
- `search bar index`
- `FeaturedIndex`
- `own RestaurantsIndex`
- `create restaurant form` (should be able to persist unpublished projects)


### RewardStore

Holds persisted reward data to send to the API.

##### Actions:
- `receiveRewards`


##### Listeners:
- `Rewards Index`
- `User Rewards Index`


### ContributionStore

##### Actions:
- `receiveContributions`

##### Listeners:
- `ownRestaurantsIndex`
