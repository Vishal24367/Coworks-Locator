class AvailableDate < ApplicationRecord
    belongs_to :meeting_room
    has_many :time_slots

    validates_presence_of :availability_date, :meeting_room
end
