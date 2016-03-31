class Api::RestaurantsController < ApplicationController

	def show
		@restaurant = Restaurant.with_total.find(params[:id])
	end

	def index
		if params[:str]
			str = params[:str]
			str = str.split.map(&:capitalize).join(' ')

			@restaurants = Restaurant.includes(:city, :user).with_total.where("title LIKE ?", "%#{str}%")
		elsif params[:cuisine_id]
			cuisine_id = params[:cuisine_id].to_i
			@restaurants = Restaurant.includes(:city, :user).with_total.where(cuisine_id: cuisine_id)
		end
	end

end
