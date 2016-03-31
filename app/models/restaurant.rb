class Restaurant < ActiveRecord::Base
	belongs_to :user
	belongs_to :cuisine
	belongs_to :city
	has_many :contributions


	def self.with_total()
		restaurants = Restaurant.joins("LEFT OUTER JOIN contributions ON contributions.restaurant_id = restaurants.id").
		group(:id).select("restaurants.*, SUM(contributions.value) as total, COUNT(contributions.user_id) as number_contributions")



		restaurants
	end


end
