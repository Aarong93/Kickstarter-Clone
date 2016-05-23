class Api::RestaurantsController < ApplicationController
	before_action :ensure_logged_in, only: :create
	attr_accessor :restaurant, :restaurants

	def show
		@restaurant = Restaurant.with_total.includes(:city, :rewards, :user).find(params[:id])
		if !restaurant.published && !params[:edit]
			render text: "This restaurant is not public yet", status: 400
		elsif params[:edit] && current_user.id != restaurant.user_id
			render text: "This restaurant is not your restaurant", status: 401
		end
	end

	def destroy
		@restaurant = Restaurant.find(params[:id])
		if logged_in_as?(@restaurant.user_id)
			restaurant.destroy
			render json: restaurant
		else
			render text: "You must be logged in as owner to delete", status: 401
		end
	end

	def update
		restaurant = Restaurant.find(params[:id])
		if logged_in_as?(restaurant.user_id)
			restaurant.update(restaurant_params)
			render :create
		else
			render text: "You must be logged in as owner to edit", status: 401
		end
	end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    restaurant.featured = false
    restaurant.published = false
		restaurant.city_id = restaurant.city_id.to_i
    restaurant.user_id = current_user.id

    unless restaurant.save
      render text: restaurant.errors.full_messages, status: 400
    end
  end

	def index
		search = SearchProjects.new(params, current_user)
		@restaurants = search.search!
		if restaurants && params[:reward_user_id]
			render :backed_index
		elsif restaurants.respond_to?(:total_pages)
			render :search_result
		elsif restaurants
			@restaurant = restaurants
			render :show
		else
			render text: "nothing here"
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
			:image_url,
			:image
    )
  end

end
