class CoworkSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :uniqueKey, :latitude, :longitude, :meeting_rooms_count

  def meeting_rooms_count
    self.object.meeting_rooms.count
  end
end
