class TimeSlot < ApplicationRecord
    belongs_to :available_date

    validates_presence_of :name, :from, :to, :available_date
end
