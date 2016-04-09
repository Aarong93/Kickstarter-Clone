@restaurant.total = @restaurant.total || 0

json.extract! @restaurant, :id, :cuisine, :user, :title, :city, :blurb, :description, :total, :target, :expiration, :published, :featured, :number_contributions

json.rewards @restaurant.rewards.order(min_dollar_amount: :asc)

json.image_url asset_path(@restaurant.image.url(:large))
