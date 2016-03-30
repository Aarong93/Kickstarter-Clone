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
	{food: "Thai"}
])

Restaurant.delete_all

restaurants = Restaurant.create([
	{user_id: user.id, cuisine_id: cuisines.first.id, title: "Aaron's Pizza", city_id: cities[1].id, blurb: "Pizza!!!", target: 10000, current: 50, expiration: Date.parse("2016/09/16"), published: true, featured: true, image_urL: "http://www.thickslicepizza.com/img/photo3.jpg" }
])
