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
    @photostory = PhotoStory.find_or_create_by(title: params[:title]) do |photo_story|
      @user.photo_stories.push(photo_story)
      @photostory = photo_story
      # byebug
    end
    @photostory.title = params[:title]
    @photostory.description = params[:description]
    @photostory.private = params[:private]

    @photo = Photo.new
    @photo.caption = params[:caption]
    @photo.picture = params[:picture]
    # byebug
    @user.photo_stories.find_by(id: @photostory.id).photos.push(@photo)
    @photostory.save
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

  def update
    @photo = Photo.find_by(id: params[:id])
    @photo.update(caption: params[:caption])
    @photo.save

    render json: @photo
  end

end
