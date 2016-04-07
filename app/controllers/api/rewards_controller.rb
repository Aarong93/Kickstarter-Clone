class Api::RewardsController < ApplicationController


  def create
    @reward = Reward.new(reward_params)
    render json: @reward if @reward.save
  end

  def index

  end

  def show

  end

  def update

  end

  def destroy

  end

  private

  def reward_params
    params.require(:reward).permit(:name, :restaurant_id, :description, :min_dollar_amount)
  end

end
