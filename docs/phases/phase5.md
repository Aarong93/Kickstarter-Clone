# Phase 5: Landing Page and Search Components (2 days)

## Rails
### Models
* Contribution (foreign keys: {user_id, project_id}, amount)

### Controller
  ContributionsController (create, show, index)

### Views
  Jbuilder views for contribution model (create, show, index (edit, destroy are mbys))
## Flux
### Views (React Components)
* ContributionsIndex (for each restaurant project, creator should be able
  to see email of those who have donated and the amount they have given)
  - ContributionsIndexItem
* CreateContributionForm
* ContributionsIndex of own investments (should show a restaurant like index here also)
  - IndexItem

### Stores
* ContributionsStore

### Actions
* RestaurantActions.receiveContributions


### ApiUtil
* ApiUtil.CreateContribution
* ApiUtil.FetchContributions(project)
* ApiUtil.FetchContributions(user)


## Gems/Libraries
