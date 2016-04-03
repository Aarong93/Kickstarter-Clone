class CreateRewards < ActiveRecord::Migration
  def change
    create_table :rewards do |t|
      t.string :name, null: false
      t.integer :restaurant_id, null: false
      t.text :description, null: false
      t.integer :maximum
      t.integer :min_dollar_amount

      t.timestamps null: false
    end
  end
end
