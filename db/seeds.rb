# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


def rand_day
  day = rand(28) + 1
  if day < 10
    day = "0#{day}"
  end

  day
end

def rand_month
  month = 6 + rand(6)
  if month < 10
    month = "0#{month}"
  end

  month
end

def random_future_date
  "2016/#{rand_month}/#{rand_day}"
end

City.delete_all

cities = City.create([
	{ name: 'Los Angeles' },
	{ name: 'New York' },
	{ name: 'Chicago'}
])

User.delete_all

user = User.create([
  {
		name: 'Aaron Grau',
		email: 'aaron.r.grau@gmail.com',
		password: 'password12'
	},
])

users = []

20.times do
  users << User.create({ name: Faker::Name.name,
    email: Faker::Internet.email, password: "password"})
end

guest = User.create({
		name: 'Guest',
		email: 'guest@gmail.com',
		password: 'password'
	})


Cuisine.delete_all

cuisines = Cuisine.create([
	{food: "Italian"},
	{food: "French"},
	{food: "Spanish"},
	{food: "Mexican"},
	{food: "Chinese"},
	{food: "Japanese"},
	{food: "Pizza"},
	{food: "Americano"},
	{food: "Barbecue"},
	{food: "Indian"},
	{food: "Thai"},
	{food: "Turkish"}
])

Restaurant.delete_all

restaurants = []

description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."




400.times do |i|
  word1 = Faker::Hipster.word
  word2 = Faker::Hipster.word
  word3 = Faker::Hipster.word

	target = 10000 + rand(50000)
  cuisine = cuisines.shuffle.first;
  user_num = rand(20)
	restaurants.push(Restaurant.create!({
    user_id: users[user_num].id, cuisine_id: cuisine.id, title: word1 + " " + word2 + " " + word3,
     city_id: cities[rand(3)].id, blurb: Faker::Hipster.sentence, target: target,
     expiration: Date.parse(random_future_date),
     published: true, featured: true, description: Faker::Hipster.paragraph
  }))
end

3.times do |i|
  word1 = Faker::Hipster.word
  word2 = Faker::Hipster.word
  word3 = Faker::Hipster.word

	target = 10000 + rand(50000)
  cuisine = cuisines.shuffle.first;
	restaurants.push(Restaurant.create!({
    user_id: guest.id, cuisine_id: cuisine.id, title: word1 + " " + word2 + " " + word3,
    city_id: cities[rand(3)].id, blurb: Faker::Hipster.sentence, target: target,
    expiration: Date.parse(random_future_date), published: true,
    featured: true, description: Faker::Hipster.paragraph}))
end

Reward.delete_all

reward1 = {name: "One Free Lunch", min_dollar_amount: 10, description: Faker::Hipster.sentence}
reward2 = {name: "Three Free Dinners", min_dollar_amount: 100, description: Faker::Hipster.sentence}

restaurants.each do |restaurant|
  restaurant.rewards.create!(reward1)
  restaurant.rewards.create!(reward2)
end


Contribution.delete_all

4000.times do |i|
  user_num = rand(20)
	x = rand(400)
	val = 200 + rand(3000)
 	Contribution.create!(
		{user_id: users[user_num].id, restaurant_id: restaurants[x].id, value: val }
	)
end

5.times do |i|
	x = rand(400)
	val = 200 + rand(3000)
 	Contribution.create!(
		{user_id: guest.id, restaurant_id: restaurants[x].id, value: val }
	)
end
