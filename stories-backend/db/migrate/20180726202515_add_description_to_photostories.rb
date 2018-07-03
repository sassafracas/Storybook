class AddDescriptionToPhotostories < ActiveRecord::Migration[5.2]
  def change
    add_column :photo_stories, :description, :string
  end
end
