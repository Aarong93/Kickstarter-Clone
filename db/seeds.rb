# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

City.delete_all

cities = City.create([
	{ name: 'Los Angeles' },
	{ name: 'New York' },
	{ name: 'Chicago'}
])

User.delete_all

user = User.create({
	name: 'Aaron Grau',
	email: 'aaron.r.grau@gmail.com',
	password: 'password12'
})


Cuisine.delete_all

cuisines = Cuisine.create([
	{food: "Italian"},
	{food: "French"},
	{food: "Spanish"},
	{food: "Mexican"},
	{food: "Chinese"},
	{food: "Japanese"},
	{food: "Burgers"},
	{food: "Americano"},
	{food: "Barbecue"},
	{food: "Indian"},
	{food: "Thai"},
	{food: "Bar"}
])

Restaurant.delete_all

restaurants = []

400.times do |i|
	restaurants.push(Restaurant.create({user_id: user.id, cuisine_id: cuisines.shuffle.first.id, title: "Aaron's Test#{i}", city_id: cities[1].id, blurb: "Test Test Test !!!", target: 10000, expiration: Date.parse("2016/09/16"), published: true, featured: true, image_url: "http://burgerdays.com/wp-content/uploads/2011/03/jackson20burgerfullSMALL.jpg" },))
end

Contribution.delete_all

contribution = Contribution.create([
	{user_id: user.id, restaurant_id: restaurants.first.id, value: 1000 },
	{user_id: user.id, restaurant_id: restaurants.second.id, value: 5940 },
	{user_id: user.id, restaurant_id: restaurants.third.id, value: 8701 },
	{user_id: user.id, restaurant_id: restaurants.first.id, value: 25 },
	{user_id: user.id, restaurant_id: restaurants.first.id, value: 30 },
	{user_id: user.id, restaurant_id: restaurants.first.id, value: 25 },
	])
