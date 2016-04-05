class Api::CitiesController < ApplicationController

	def index
		@cities = City.all.order(name: :asc)
	end

end
