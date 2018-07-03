class Photo < ApplicationRecord
  belongs_to :photo_story
  mount_uploader :picture, PictureUploader
end
