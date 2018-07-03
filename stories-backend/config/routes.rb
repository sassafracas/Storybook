Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:index, :show, :create, :token]
  resources :photos, only: [:index, :show, :create]
  resources :photostories, only: [:index, :show, :create, :destroy]
  resources :sessions, only: [:create]

  post "/users/token", to: "users#token"
  get "/users/:id/photostories", to: "users#user_photo_stories"
  get "/photostories/:id/photos", to: "photostories#photostory_photos"
end
