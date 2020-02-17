Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static#index'
  
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :timesheet_entries, only: [:index, :create, :destroy, :update]
    end
  end
end
