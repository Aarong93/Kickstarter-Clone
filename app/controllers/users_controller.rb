class UsersController < ApplicationController


  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
		@user.email.downcase!
    if @user.save
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end

  end

  def index
    @users = User.all
  end


  private

  def user_params
    params.require(:user).permit(:email, :password, :name)
  end

end
