json.array! @restaurants do |restaurant|
	restaurant.total = restaurant.total || 0
  json.extract! restaurant, :id, :user, :title, :city, :blurb, :description, :total, :target, :expiration, :published, :featured, :number_contributions

	json.image_url asset_path(restaurant.image.url(:original))

end
