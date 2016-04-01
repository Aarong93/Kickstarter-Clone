class Api::ContributionsController < ApplicationController
	before_action :ensure_logged_in
	
	def create
		@contribution = Contribution.new(contribution_params)
		@contribution.user_id = current_user.id
		@contribution.save!
	end

	private

	def contributions_params
		params.require(:contribution).permit(:value, :restauraunt_id)
	end
end
