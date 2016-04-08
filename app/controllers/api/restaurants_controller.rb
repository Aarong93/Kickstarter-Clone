class Api::RestaurantsController < ApplicationController
	before_action :ensure_logged_in, only: :create

	def show
		@restaurant = Restaurant.with_total.includes(:city, :rewards, :user).find(params[:id])
		if !@restaurant.published && !params[:edit]
			render text: "This restaurant is not public yet", status: 400
		elsif params[:edit] && current_user.id != @restaurant.user_id
			render text: "This restaurant is not your restaurant", status: 401
		end
	end

	def update
		@restaurant = Restaurant.find(params[:id])
		if logged_in_as?(@restaurant.user_id)
			@restaurant.update(restaurant_params)
			render :create
		else
			render text: "You must be logged in as owner to edit", status: 401
		end
	end

  def create
    @restaurant = Restaurant.new(restaurant_params)
    @restaurant.featured = false
    @restaurant.published = false
		@restaurant.city_id = @restaurant.city_id.to_i
    @restaurant.user_id = current_user.id

    unless @restaurant.save
      render text: @restaurant.errors.full_messages, status: 400
    end
  end

	def index
		if params[:cuisine_id] && params[:featured]
			@restaurants = Restaurant.includes(:city, :user).where(featured: true).where(published: true).where(cuisine_id: params[:cuisine_id]).order(id: :asc).page(1).per(params[:per])
			if @restaurants
				render :search_result
			else
				render text: "nothing here"
			end
		elsif params[:str]
			str = params[:str]
      valid_ids = Restaurant.select("restaurants.id AS id").restaurant_search(str).pluck(:id)
      @restaurants = Restaurant.includes(:city, :user)
        .where(id: valid_ids).where(published: true).order(id: :asc).page(params[:page]).per(3)
      if @restaurants
        render :search_result
      else
        render text: "nothing here"
      end
		elsif params[:cuisine_id]
			per = params[:per] || 9
			@restaurants = Restaurant.includes(:city, :user)
        .where(cuisine_id: params[:cuisine_id]).where(published: true)
        .where("expiration > NOW()").order(id: :asc).page(1).per(per)

			render :search_result
		elsif params[:featured]
			@restaurants = Restaurant.includes(:city, :user).with_total.where(featured: true)
        .where(published: true).where("expiration > NOW()").order(id: :asc)
			@restaurant = @restaurants.shuffle.first;
			render :show
    elsif params[:user_id]
      @restaurants = Restaurant.includes(:city, :user).where(user_id: current_user.id).page(1).per(100)
      if @restaurants
        render :search_result
      else
        render text: "nothing here"
      end
    elsif params[:reward_user_id]
      @restaurants =
        Restaurant.includes(:city, :user)
        .joins(:contributions)
        .where(contributions: { user_id: params[:reward_user_id]})
        .uniq
      if @restaurants
        render :backed_index
      else
        render text: "nothing here"
      end
		else
			@restaurants = Restaurant.includes(:city, :user).with_total.where(published: true).order(id: :asc)
			@restaurant = @restaurants.shuffle.first;
			render :show
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
