class ChangesessionToSession < ActiveRecord::Migration
  def change
		rename_column :users, :session_token, :session_token
  end
end
