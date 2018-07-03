class CreatePhotoStories < ActiveRecord::Migration[5.2]
  def change
    create_table :photo_stories do |t|
      t.string :title
    end
  end
end
