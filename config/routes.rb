Conschedule::Engine.routes.draw do

  root to: "schedules#index"

  resources :schedules do
    member do
      post 'cancel'
    end
  end

end