class PhotoStory < ApplicationRecord
  belongs_to :user
  has_many :photos, dependent: :destroy

  validates :title, presence: true, uniqueness: true

  def destroy_if_empty_photos
    if photos.count == 0
      self.destroy
    end
  end
end
