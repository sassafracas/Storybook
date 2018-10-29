Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/photostories/public", to: "photostories#public"

  resources :users, only: [:index, :show, :create, :token]
  resources :photos, only: [:index, :show, :create, :update, :patch, :destroy]
  resources :photostories, only: [:show, :create, :destroy, :public]
  resources :sessions, only: [:create]

  post "/users/token", to: "users#token"

  get "/users/:id/photostories", to: "users#user_photo_stories"
  get "/photostories/:id/photos", to: "photostories#photostory_photos"

end
