json.array! @restaurants do |restaurant|
	restaurant.total = restaurant.total || 0
  json.extract! restaurant, :id, :user, :title, :city, :blurb, :description, :total, :target, :expiration, :published, :featured, :image_url, :number_contributions
end
