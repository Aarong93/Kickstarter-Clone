class CreateRestaurant < ActiveRecord::Migration
  def change
    create_table :restaurants do |t|
			t.integer :user_id, null: false
			t.integer :cuisine_id, null: false
			t.string :title, null: false
			t.integer :city_id
			t.text :blurb
			t.string :description
			t.integer :target
			t.integer :current
			t.date :expiration
			t.boolean :published, null: false
			t.boolean :featured

			t.timestamps
    end

		add_index :restaurants, :user_id
		add_index :restaurants, :title, unique: true
		add_index :restaurants, :cuisine_id
		add_index :restaurants, :city_id
		add_index :restaurants, :published
  end
end
