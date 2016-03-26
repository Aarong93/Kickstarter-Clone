# KitchenStarter

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

KitchenStarter is a web application inspired by KickStarter built using Ruby on Rails
and React.js. KitchenStarter allows users to:

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete restaurant proposals
- [ ] Users can donate to restaurants they think will be successful!
- [ ] Sort restaurants by cuisines (and location?), search functionality
- [ ] Allows project starter to offer rewards to larger contributors
      and users to qualify for these rewards

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Stores][stores]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: ./docs/views.md
[components]: ./docs/components.md
[stores]: ./docs/stores.md
[api-endpoints]: ./docs/api-endpoints.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Backend setup and User Authentication (0.5 days)

**Objective:** Functioning rails project with Authentication

- [ ] create new project
- [ ] create `User` model
- [ ] authentication
- [ ] static (non react) user signup/signin pages
- [ ] users can add fake credit cards to later use for project contributions
- [ ] redirects to single page app root after login

### Phase 2: Notes Model, API, and basic APIUtil (1.5 days)

**Objective:** Restaurants can be created, read, edited and destroyed through
the API.

- [ ] create `Restaurant Project` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for Restaurants
- [ ] jBuilder views for Restaurants
- [ ] setup Webpack & Flux scaffold
- [ ] setup `APIUtil` to interact with the API
- [ ] test out API interaction in the console.

### Phase 3: Flux Architecture and Router (3 days)

**Objective:** Restaurants Projects can be created, read, edited and destroyed with the
user interface.

- [ ] setup the flux loop with skeleton files
- [ ] setup React Router
- [ ] implement each restaurant component component, building out the flux loop as needed.
  - [ ] Restaurant Index (nested by cusines)
  - [ ] Restaurant Show Page
  - [ ] Restaurant Creation/Edit component
  - [ ] Logged In User dropdown (lists own projects and has other links)
- [ ] save to DB everytime a user clicks a different tab in the create project page
- [ ] users can contribute to projects

### Phase 4: Start Styling (1 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Landing Page and Search Components (1.5 day)

**Objective:** Build out app root page and allow users to search
for restaurants by location and cuisines

- [ ] build out Flux loop, and components for:
  - [ ] dynamic Search Display
  - [ ] show featured projects on front page
- [ ] Use CSS to style new views


### Phase 6: Styling Cleanup and Seeding (1.5 day)

**objective:** Make the site feel more cohesive and smooth

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Allow users to add images and fancy styling in project description
- [ ] Recommended for you supported by backend and actual past cuisine searches
- [ ] Pagination / infinite scroll for Restaurant Index
- [ ] Add Friendly Transition/Guide Pages that real KickStarter site has
- [ ] Multiple sessions

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
