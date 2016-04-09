
json.meta do
  json.total_pages @restaurants.total_pages
  if params[:cuisine_id]
	   json.query params[:cuisine_id]
  elsif params[:str]
    json.query params[:str]
  end
  json.per @restaurants.size
	json.total_count @restaurants.total_count
  json.page @restaurants.current_page
end

json.search_results @restaurants.with_total do |restaurant|
	restaurant.total = restaurant.total || 0
  json.extract! restaurant, :id, :user, :title, :city, :blurb, :description, :total, :target, :expiration, :published, :featured, :number_contributions
  
	json.image_url asset_path(restaurant.image.url(:small))
end
