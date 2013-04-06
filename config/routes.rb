Emberpairs::Application.routes.draw do
  namespace :api do
    get 'people' => 'people#index'
    post 'people' => 'people#create'
  end

  match '/auth/:provider/callback' => 'sessions#create'

  root :to => 'application#index'
end
