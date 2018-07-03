class ChangeDescriptionToTextInPhotoStories < ActiveRecord::Migration[5.2]
  def change
    change_column :photo_stories, :description, :text
  end
end
