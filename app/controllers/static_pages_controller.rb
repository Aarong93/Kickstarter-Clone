class StaticPagesController < ApplicationController

	before_action :require_login

	def root
	end

	private

	def require_login
		redirect_to new_user_url unless (signed_in?)
	end


end
