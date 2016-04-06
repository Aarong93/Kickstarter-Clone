class Contribution < ActiveRecord::Base
	belongs_to :user
	belongs_to :restaurant
  belongs_to :reward
  
	validates :user_id, :value, :restaurant_id, presence: true
end
