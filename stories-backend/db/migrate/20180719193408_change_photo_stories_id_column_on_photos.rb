class ChangePhotoStoriesIdColumnOnPhotos < ActiveRecord::Migration[5.2]
  def change
    rename_column :photos, :photo_stories_id, :photo_story_id
  end
end
