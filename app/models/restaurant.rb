class Restaurant < ActiveRecord::Base
	belongs_to :user
	belongs_to :cuisine
	belongs_to :city

end
