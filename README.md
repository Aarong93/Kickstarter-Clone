# KitchenStarter

KitchenStarter is a web application inspired by KickStarter built using Ruby on Rails and React.js. Users can get seed money for new restaurant ideas.

Explore at [kitchenstarter.net][live]

[live]: http://www.kitchenstarter.net


## Welcome View:

![home-page]

[home-page]: docs/images/home-page.png

## Project Page:

![project-page]

[project-page]: docs/images/project-page.png

## Techincal Details:

- KitchenStarter displays the total value of the contributions of any given project.
  This occurs on several pages, such as the project show page as well as in index display on index items. In order to avoid duplication of data KitchenStarter only saves the values of the contribution in one place, the contribution table (each contribution belongs to a project). Because of this each time a project is displayed it needs to calculate its total amount raised by summing up the value of all of its contributions. In order to make this process efficient (especially a concern on index pages) I implemented a SQL query which calculates the total value of contributions and returns it as an aliased value as part of the select. Rails allows the aliased value to be later accessed like any other value the project has.

```
def self.with_total()
  restaurants = Restaurant.joins(
    "LEFT OUTER JOIN contributions ON
     contributions.restaurant_id = restaurants.id")
     .group(:id).select("restaurants.*, SUM(contributions.value) as total,
     COUNT(contributions.user_id) as number_contributions"
  )

  restaurants
end

```

## Features:

- Sign in with facebook or email
- View featured restaurants on home page
- Search for restaurants on index page by cuisine
- Search for and view restaurants in search bar
- View detailed show page for published projects
- Contribute to projects and pick rewards
- Create and edit your own projects
- Upload images for your own projectsf
- View created and backed projects on profile page


##To-do:

- [ ] Save searches and rerun them if user presses back after searching
- [ ] Show rewards earned on backed projects page
- [ ] Add comment section for projects
- [ ] Add stripe API and allow users to use fake credit card and process payments
