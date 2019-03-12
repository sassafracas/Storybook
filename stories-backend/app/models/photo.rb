class Photo < ApplicationRecord
  belongs_to :photo_story
  mount_uploader :picture, PictureUploader
  after_destroy :notify_photo_story

  validates :caption, presence: true
  validates :picture, presence: true

  def notify_photo_story
    photo_story.destroy_if_empty_photos
  end
end
