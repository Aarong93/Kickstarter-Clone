class Restaurant < ActiveRecord::Base
	belongs_to :user
	belongs_to :cuisine
	belongs_to :city
	has_many :contributions
	has_many :rewards

	has_attached_file :image, default_url: "burger.jpg"
	validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

	validates :user_id, :cuisine_id, :title, :city_id, presence: true
	validates :title, uniqueness: true

	def self.with_total()
		restaurants = Restaurant.joins("LEFT OUTER JOIN contributions ON contributions.restaurant_id = restaurants.id").
		group(:id).select("restaurants.*, SUM(contributions.value) as total, COUNT(contributions.user_id) as number_contributions")

		restaurants
	end


end
