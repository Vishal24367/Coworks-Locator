class Cowork < ApplicationRecord
    has_many :meeting_rooms, dependent: :destroy

    validates_presence_of :name, :address, :uniqueKey, :latitude, :longitude
end
