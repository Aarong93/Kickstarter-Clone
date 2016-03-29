class ChangeCuisineColumn < ActiveRecord::Migration
  def change
		rename_column :cuisines, :type, :food
  end
end
