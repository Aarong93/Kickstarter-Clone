Rails.application.routes.draw do
  resource :session, only: [:new, :create, :destroy]
	resources :users, only: [:new, :create]
	root to: "static_pages#root"
	namespace :api, defaults: {format: :json} do
		resources :restaurants, only: [:create, :show, :destroy, :patch, :index]
	end

	get '*unmatched_route', to: 'static_pages#root'
end
