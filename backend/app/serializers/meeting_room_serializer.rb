class MeetingRoomSerializer < ActiveModel::Serializer
  attributes :meeting_room_id, :meeting_room_name, :available_slots

  def meeting_room_id
    self.object.id
  end

  def meeting_room_name
    self.object.name
  end
  
  def available_slots
    available_date_ids = self.object.available_dates.pluck(:id)
    available_time_slot_ids = TimeSlot.where(available_date_id: available_date_ids, isAvailable: true).pluck(:id)
    result = "No Available Slots present in this meeting room."
    zone = ActiveSupport::TimeZone.new("Asia/Kolkata")
    if available_time_slot_ids.count > 0
      ans_result = []
      available_time_slot_ids.each do |time_slot_id|
        date_time_object = {}
        time_slot = TimeSlot.find(time_slot_id)
        date_time_object['availableDateId'] = time_slot.available_date.id
        date_time_object['availableDate'] = time_slot.available_date.availability_date
        date_time_object['timeSlotId'] = time_slot.id
        date_time_object['timing'] = time_slot.from.in_time_zone(zone).strftime("%I:%M %p") + " to " + time_slot.to.in_time_zone(zone).strftime("%I:%M %p")
        ans_result << date_time_object
      end
    end
    available_time_slot_ids.count > 0 ? ans_result : result
  end
end
