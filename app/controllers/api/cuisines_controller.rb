class Api::CuisinesController < ApplicationController

	def index
		@cuisines = Cuisine.all.order(food: :asc)
	end

end
