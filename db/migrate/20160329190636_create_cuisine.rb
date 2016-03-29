class CreateCuisine < ActiveRecord::Migration
  def change
    create_table :cuisines do |t|
			t.string :type

			t.timestamps;
    end

		add_column(:users, :created_at, :datetime)
		add_column(:users, :updated_at, :datetime)
  end
end
