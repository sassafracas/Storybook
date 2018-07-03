class AddFileToPhotos < ActiveRecord::Migration[5.2]
  def change
    add_column :photos, :file, :string
  end
end
