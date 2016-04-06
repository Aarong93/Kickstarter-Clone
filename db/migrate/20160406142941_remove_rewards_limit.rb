class RemoveRewardsLimit < ActiveRecord::Migration
  def change
    remove_column :rewards, :maximum
  end
end
