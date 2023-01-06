Rails.application.routes.draw do
  get 'todolists/index'
  get 'todolists/create'
  get 'todolists/update'
  get 'todolists/destroy'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  scope '/api/version1' do
    resources :tdlists
    end
end
