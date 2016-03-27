# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Restaurants

- `GET /api/Restaurants`
  - accepts `cuisine` query param to list Restaurants by cuisine
- `POST /api/Restaurants`
- `GET /api/Restaurants/:id`
- `PATCH /api/Restaurants/:id`
- `DELETE /api/Restaurants/:id`

### Contributions

- `POST /api/contributions`
- `GET /api/users/:user_id/contributions`
- `GET /api/restaurants/:restaurant_id/contributions`


### Rewards

- `GET /api/restaurants/:restaurant_id/rewards`
- `GET /api/user/:user_id/rewards`
- `POST /api/rewards`
