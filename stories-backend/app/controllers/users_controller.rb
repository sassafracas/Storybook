class UsersController < ApplicationController
   before_action :requires_login, only: [:index, :show]
   before_action :is_admin, only: [:index]

  def index
    render json: User.all
  end

  def show
    @user = User.find_by(id: params[:id])
    render json: @user
  end

  def create
    @user = User.new

    @user.username = params[:username]
    @user.password = params[:password]

    if (@user.save)
      render json: {
        username: @user.username,
        id: @user.id,
        token: get_token(payload(@user.username, @user.id))
      }
    else
      render json: {
        errors: @user.errors.full_messages
      }, status: :unprocessable_entity
    end
  end

  def user_photo_stories
    @user = User.find_by(id: params[:user_id])

    render json: @user.photo_stories
  end

end
