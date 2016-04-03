class Api::RewardsController < ApplicationController


  def create

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

  def rewards_params
    params.require(:rewards).permit(:name, :restaurant_id, :description, :maximum, :min_dollar_amount)
  end

end
