class Api::ContributionsController < ApplicationController
	before_action :ensure_logged_in

	def create
		@contribution = Contribution.new(contribution_params)
		@contribution.user_id = current_user.id
    if (params[:contribution][:reward_id] != "0")
      @contribution.reward_id = params[:contribution][:reward_id]
    end

    reward_min
		@contribution.save!
	end

	private

	def contribution_params
		params.require(:contribution).permit(:value, :restaurant_id)
	end

  def reward_min
    min_val = 1
    unless @contribution.reward_id.nil?
      reward = Reward.find(@contribution.reward_id)
      min_val = reward.min_dollar_amount
    end

    unless @contribution.value >= min_val
      render text: "Contribution amount to low for reward", status: 401
      return
    end
  end

end
