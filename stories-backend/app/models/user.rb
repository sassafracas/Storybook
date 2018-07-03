class User < ApplicationRecord
  has_secure_password

  has_many :photo_stories
  has_many :photos, through: :photo_stories

  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
end
