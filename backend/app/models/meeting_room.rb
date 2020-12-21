class MeetingRoom < ApplicationRecord
    belongs_to :cowork
    has_many :available_dates

    validates_presence_of :name
end
