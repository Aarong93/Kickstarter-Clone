class SearchProjects
  attr_accessor :params, :current_user

  def initialize(params, current_user)
    @params = params
    @current_user = current_user
  end

  def search!
    if params[:cuisine_id] && params[:featured]
      restaurants = Restaurant.includes(:city, :user).where(featured: true).
        where(published: true).where(cuisine_id: params[:cuisine_id]).order(id: :asc).
        page(1).per(params[:per])
      if restaurants
        return restaurants
      else
        return nil
      end
    elsif params[:str]
      str = params[:str]
      valid_ids = Restaurant.select("restaurants.id AS id").restaurant_search(str).pluck(:id)
      restaurants = Restaurant.includes(:city, :user)
        .where(id: valid_ids).where(published: true).order(id: :asc).page(params[:page]).per(3)
      if restaurants
        return restaurants
      else
        return nil
      end
    elsif params[:cuisine_id]
      per = params[:per] || 9
      restaurants = Restaurant.includes(:city, :user)
        .where(cuisine_id: params[:cuisine_id]).where(published: true)
        .where("expiration > NOW()").order(id: :asc).page(1).per(per)

      return restaurants
    elsif params[:featured]
      restaurants = Restaurant.includes(:city, :user).with_total.where(featured: true)
        .where(published: true).where("expiration > NOW()").order(id: :asc)
      restaurant = restaurants.shuffle.first;
      return restaurant
    elsif params[:user_id]
      restaurants = Restaurant.includes(:city, :user).where(user_id: current_user.id).page(1).per(100)
      if restaurants
        return restaurants
      else
        return nil
      end
    elsif params[:reward_user_id]
      restaurants =
        Restaurant.includes(:city, :user)
        .joins(:contributions)
        .where(contributions: { user_id: params[:reward_user_id] })
        .uniq.page(1).per(100)
      if restaurants
        return restaurants
      else
        return nil
      end
    else
      restaurants = Restaurant.includes(:city, :user).with_total.where(published: true).order(id: :asc)
      return restaurant
    end
  end

end
