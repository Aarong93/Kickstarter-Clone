class RemoveColumnFromRestaurants < ActiveRecord::Migration
  def change
		remove_column :restaurants, :current
  end
end
