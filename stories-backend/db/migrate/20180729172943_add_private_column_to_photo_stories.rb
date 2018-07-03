class AddPrivateColumnToPhotoStories < ActiveRecord::Migration[5.2]
  def change
    add_column :photo_stories, :private, :boolean
  end
end
