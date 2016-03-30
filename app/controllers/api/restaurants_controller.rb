class Api::RestaurantsController < ApplicationController

	def show
		@restaurant = Restaurant.with_total.find(params[:id])
	end

end
