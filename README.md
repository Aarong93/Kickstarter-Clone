# KitchenStarter

KitchenStarter is a web application inspired by KickStarter built using Ruby on Rails and React.js. Users can get seed money for new restaurant ideas.

Explore at [Heroku link][live]

[live]: kitchenstarter.net

## Technical Details



KitchenStarter allows users to:

- [ ] Create an account
- [ ] Log in / Log out
- [ ] Create, read, edit, and delete restaurant proposals
- [ ] Users can contribute to restaurants they want to help start
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

- [x] create new project
- [x] create `User` model
- [x] authentication
- [x] static (non react) user signup/signin pages
- [x] redirects to single page app root after login

### Phase 2: Restaurants Model, API, and basic APIUtil (1.5 days)

**Objective:** Restaurants can be created, read, edited and destroyed through
the API.

- [ ] create `Restaurant Project` model
- [ ] seed the database with a small amount of test data
- [ ] CRUD API for Restaurants
- [ ] CRUD API for rewards for large contributors
- [ ] jBuilder views for Restaurants and rewards
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

### Phase 4: Start Styling (1 days)

**Objective:** Existing pages (including singup/signin) will look good.

- [ ] create a basic style guide
- [ ] position elements on the page
- [ ] add basic colors & styles

### Phase 5: Landing Page and Search Components (2 days)

**Objective:** Build out app home page and allow users to search
for restaurants by location and cuisines

- [ ] users can contribute to projects
- [ ] build out Flux loop, and components for:
  - [ ] dynamic Search Display
  - [ ] show featured projects on front page
  - [ ] profile page that will have tabs to show own created projects as well as invested in projects
- [ ] Use CSS to style new views


### Phase 6: Styling Cleanup and Seeding (1 day)

**objective:** Make the site feel more cohesive and smooth

- [ ] Get feedback on my UI from others
- [ ] Refactor HTML classes & CSS rules
- [ ] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Allow users to comment on projects in comment tab
- [ ] Allow project creators to add images and fancy styling in project description
- [ ] Brief User Pages
- [ ] Pagination / infinite scroll for Restaurant Index
- [ ] Add Friendly Transition/Guide Pages that real KickStarter site has
- [ ] Multiple sessions
- [ ] Email notifications on completion or failure of project.

## Phase Docs
* [phase-one][phase-one]
* [phase-two][phase-two]
* [phase-three][phase-three]
* [phase-four][phase-four]
* [phase-five][phase-five]

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
