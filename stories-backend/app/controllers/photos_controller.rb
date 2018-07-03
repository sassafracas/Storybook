class PhotosController < ApplicationController

  def index
    render json: Photo.all
  end

  def show
    @photo = Photo.find_by(id: params[:id])
    render json: @photo
  end

  def create
    @user = User.find_by(id: decoded_token[0]["id"])
    @photostory = PhotoStory.new
    @photostory.title = params[:title]
    @user.photo_stories.push(@photostory)
    @photostory.save
    @photo = Photo.new
    @photo.caption = params[:caption]
    @photo.picture = params[:picture]
    @user.photo_stories.last.photos.push(@photo)




    if (@photo.save)

      render json: {
        id: @photo.id,
        caption: @photo.caption,
        picture: @photo.picture,
      }
    else
      render json: {
        errors: @photo.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

end
