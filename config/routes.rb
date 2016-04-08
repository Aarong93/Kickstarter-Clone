Rails.application.routes.draw do

	root to: "static_pages#root"

	namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:new, :create, :destroy, :show]
		resources :restaurants, only: [:create, :show, :destroy, :update, :index]
		resources :contributions, only: [:create, :show, :index]
		resources :cuisines, only: [:index]
		resources :rewards, only: [:create, :show, :index, :patch, :destoy]
		resources :cities, only: [:index]
	end

  get "auth/facebook/callback", to: "omniauth#facebook"
	get '*unmatched_route', to: 'static_pages#root', constraints: { url: /^((?!\/auth\/).)*$/ }
end
