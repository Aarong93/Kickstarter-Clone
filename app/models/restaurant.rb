class Restaurant < ActiveRecord::Base
	belongs_to :user
	belongs_to :cuisine
	belongs_to :city
	has_many :contributions

	def self.with_total
		Restaurant.joins(:contributions).group(:id).
			select("restaurants.*, SUM(contributions.value) as total, COUNT(contributions.user_id) as number_contributions")
	end


end
