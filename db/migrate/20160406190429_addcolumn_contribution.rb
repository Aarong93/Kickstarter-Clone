class AddcolumnContribution < ActiveRecord::Migration
  def change
    add_column :contributions, :reward_id, :integer
    add_index :contributions, :reward_id
  end
end
