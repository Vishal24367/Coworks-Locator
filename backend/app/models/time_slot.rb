class TimeSlot < ApplicationRecord
    belongs_to :available_date
    belongs_to :meeting_room

    validates_presence_of :name, :from, :to, :available_date, :meeting_room
end
