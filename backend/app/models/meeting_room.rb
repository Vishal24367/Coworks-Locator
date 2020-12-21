class MeetingRoom < ApplicationRecord
    belongs_to :cowork
    has_many :available_dates
    has_many :time_slots

    validates_presence_of :name
end
