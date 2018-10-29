class PhotostoriesController < ApplicationController

  def public
    # byebug
    render json: PhotoStory.where.not(user_id: decoded_token[0]["id"], private: true)
  end

  def show
    @photostory = PhotoStory.find_by(id: params[:id])

    render json: @photostory
  end

  def create
    @photostory = PhotoStory.new

    @photostory.title = params[:title]
    @photostory.description = params[:description]
    @photostory.private = params[:private]
    byebug
    if (@photostory.save)
      render json: {
        title: @photostory.title,
        description: @photostory.description,
        private: @photostory.private
      }
    else
      render json: {
        errors: @photostory.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def photostory_photos
    @photostory = PhotoStory.find_by(id: params[:id])

    render json: @photostory.photos
  end

  def destroy
    @photostory = PhotoStory.find_by(id: params[:id])

    @photostory.destroy

    render json: PhotoStory.all
  end

end
