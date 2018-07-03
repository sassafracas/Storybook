Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:index, :show, :create]
  resources :photos, only: [:index, :show, :create]
  resources :photostories, only: [:index, :show, :create]
  resources :sessions, only: [:create]
end
