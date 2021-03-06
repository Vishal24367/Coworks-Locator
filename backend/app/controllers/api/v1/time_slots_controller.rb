class Api::V1::TimeSlotsController < ApplicationController
    before_action :authenticate_user!, except: [:book_time_slot]

    def book_time_slot
        meeting_room = MeetingRoom.find(params[:meeting_room_id]) rescue false
        if meeting_room.present?
            available_date = AvailableDate.find_by(meeting_room_id: meeting_room.id, id: params[:available_date_id]) rescue false
            if available_date.present?
                time_slot = TimeSlot.find_by(id: params[:time_slot_id], available_date_id: available_date.id) rescue false
                if time_slot.present?
                    if time_slot.isAvailable == true
                        time_slot.update!(isAvailable: false)
                        render json: {message: "Meeting Room is booked for the particular time slot.", time_slot_info: time_slot, internal_status: 40}, status: :ok
                    else
                        render json: {message: "Meeting Room is already booked for the particular time slot.", internal_status: 41}, status: 422
                    end
                else
                    render json: {message: "Invalid Time Slot Id.", internal_status: 41}, status: 422
                end
            else
                render json: {message: "Invalid Available Date Id.", internal_status: 41}, status: 422
            end
        else
            render json: {message: "Invalid Meeting Room Id.", internal_status: 41}, status: 422
        end
    end

end