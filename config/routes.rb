Emberpairs::Application.routes.draw do
  namespace :api do
    get 'people' => 'people#index'
    post 'people' => 'people#create'
  end

  root :to => 'application#index'
end
