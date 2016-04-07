json.extract! @restaurant, :rewards, :id, :user, :description, :title, :blurb,  :target, :expiration, :published, :featured

json.image_url asset_path(@restaurant.image.url(:original))
