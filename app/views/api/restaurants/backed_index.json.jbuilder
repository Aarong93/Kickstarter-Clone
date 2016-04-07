json.array! @restaurants do |restaurant|
  json.extract! restaurant, :id, :user, :title, :city, :blurb, :description, :target, :expiration, :published, :featured

	json.image_url asset_path(restaurant.image.url(:original))
end
