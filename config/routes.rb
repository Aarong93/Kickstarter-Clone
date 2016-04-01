Rails.application.routes.draw do

	root to: "static_pages#root"

	namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:new, :create, :destroy, :show]
		resources :restaurants, only: [:create, :show, :destroy, :patch, :index]
		resources :contributions, only: [:create, :show, :index]
		resources :cuisines, only: [:index]
	end

	get '*unmatched_route', to: 'static_pages#root'
end
