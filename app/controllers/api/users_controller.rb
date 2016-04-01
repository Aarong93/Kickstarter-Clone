class Api::UsersController < ApplicationController


  def create
    @user = User.new(user_params)
		@user.email.downcase!
    if @user.save
      log_in!(@user)
      render json: @user
    else
      render json: { message: "Invalid User Info!"}, status: 401
    end

  end


  private

  def user_params
    params.require(:user).permit(:email, :password, :name)
  end

end
