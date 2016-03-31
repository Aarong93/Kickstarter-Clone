class Api::RestaurantsController < ApplicationController

	def show
		@restaurant = Restaurant.with_total.find(params[:id])
	end

	def index
		if params[:str]
			str = params[:str]
			str = str.split.map(&:capitalize).join(' ')
			@restaurants = Restaurant.with_total.where('title LIKE ?', "%#{str}%")
		end
	end

end
