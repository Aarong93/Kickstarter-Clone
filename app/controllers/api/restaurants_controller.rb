class Api::RestaurantsController < ApplicationController
	before_action :ensure_logged_in, only: :create

	def show
		@restaurant = Restaurant.with_total.find(params[:id])
	end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.featured = false
    @restaurant.published = false
    @restaurant.user_id = current_user.id
    @restaurant.save
  end

	def index
		if params[:str]
			str = params[:str]
			str = str.split.map(&:capitalize).join(' ')

			@restaurants = Restaurant.includes(:city, :user).with_total.where("title LIKE ?", "%#{str}%").where(published: true)
		elsif params[:cuisine_id]
			cuisine_id = params[:cuisine_id].to_i
			@restaurants = Restaurant.includes(:city, :user).with_total.where(cuisine_id: cuisine_id).where(published: true)
		end
	end

  private

  def restaurant_params
    params.require(:restaurant).permit(
      :cuisine_id,
      :title,
      :city_id,
      :blurb,
      :description,
      :target,
      :expiration,
      :published,
    )
  end

end
