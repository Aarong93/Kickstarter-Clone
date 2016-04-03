class ApplicationController < ActionController::Base
	protect_from_forgery with: :exception

	helper_method :current_user, :signed_in?

	def current_user
		@current_user ||= User.find_by(session_token: session[:session_token])
	end

	def logged_in?
		!!current_user
	end

	def log_in!(user)
		session[:session_token] = user.reset_token!
	end

	def log_out!
		current_user.reset_session_token! if logged_in?
		session[:session_token] = nil
	end


	private

	def ensure_logged_in
		unless logged_in?
			render text: "You must log in", status: 401
		end
	end

	def logged_in_as?(id)
		current_user.id == id
	end

	def ensure_logged_out
		redirect_to posts_url if logged_in?
	end
end
