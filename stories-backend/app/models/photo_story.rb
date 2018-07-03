class PhotoStory < ApplicationRecord
  belongs_to :user
  has_many :photos

  validates :title, presence: true, uniqueness: true
end
