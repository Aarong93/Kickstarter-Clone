class SearchProjects
  attr_accessor :params, :current_user

  def initialize(params, current_user)
    @params = params
    @current_user = current_user
  end

  def search
    if params[:cuisine_id] && params[:featured]
      return featured_from_cuisine
    elsif params[:str]
      return text_search
    elsif params[:cuisine_id]
      return cuisine_search
    elsif params[:featured]
      return main_featured
    elsif params[:user_id]
      return users_restaurants
    elsif params[:reward_user_id]
      return contributed_to_restuarants
    else
      restaurants = Restaurant.includes(:city, :user).with_total.where(published: true).order(id: :asc)
      return restaurant
    end
  end

  private

  def featured_from_cuisine
    restaurants = Restaurant.includes(:city, :user).where(featured: true).
      where(published: true).where(cuisine_id: params[:cuisine_id]).order(id: :asc).
    page(1).per(params[:per])
    return restaurants unless restaurants.empty?

    nil
  end

  def text_search
    str = params[:str]
    valid_ids = Restaurant.select("restaurants.id AS id").restaurant_search(str).pluck(:id)
    restaurants = Restaurant.includes(:city, :user)
      .where(id: valid_ids).where(published: true).order(id: :asc).page(params[:page]).per(3)
    return restaurants unless restaurants.empty?

    nil
  end

  def cuisine_search
    per = params[:per] || 9
    restaurants = Restaurant.includes(:city, :user)
      .where(cuisine_id: params[:cuisine_id]).where(published: true)
      .where("expiration > NOW()").order(id: :asc).page(1).per(per)

    restaurants
  end

  def main_featured
    restaurants = Restaurant.includes(:city, :user).with_total.where(featured: true)
      .where(published: true).where("expiration > NOW()").order(id: :asc)
    restaurant = restaurants.shuffle.first;

    restaurant
  end

  def users_restaurants
    restaurants = Restaurant.includes(:city, :user).where(user_id: current_user.id).page(1).per(100)
    return restaurants unless restaurants.empty?

    nil
  end

  def contributed_to_restuarants
    restaurants =
      Restaurant.includes(:city, :user)
      .joins(:contributions)
      .where(contributions: { user_id: params[:reward_user_id] })
      .uniq.page(1).per(100)
    return restaurants unless restaurants.empty?

    nil
  end

end
