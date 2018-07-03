class AddUserIdToPhotoStories < ActiveRecord::Migration[5.2]
  def change
    add_column :photo_stories, :user_id, :integer
  end
end
