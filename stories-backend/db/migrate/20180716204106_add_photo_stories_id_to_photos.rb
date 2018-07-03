class AddPhotoStoriesIdToPhotos < ActiveRecord::Migration[5.2]
  def change
    add_column :photos, :photo_stories_id, :integer
  end
end
