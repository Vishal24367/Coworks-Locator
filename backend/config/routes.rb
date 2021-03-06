Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :coworks
      resources :meeting_rooms do 
        collection do
          get 'find_by_date_and_time'
        end
      end
      resources :time_slots do
        collection do
          post 'book_time_slot'
        end
      end
    end
  end
end
