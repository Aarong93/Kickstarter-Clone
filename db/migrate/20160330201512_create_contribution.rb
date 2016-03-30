class CreateContribution < ActiveRecord::Migration
  def change
    create_table :contributions do |t|
			t.integer :user_id, null: false
			t.integer :restaurant_id, null: false
			t.integer :value, null: false
			t.timestamps
    end

		add_index :contributions, :user_id
		add_index :contributions, :restaurant_id
  end
end
