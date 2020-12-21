class Api::V1::MeetingRoomsController < ApplicationController

    def index
        cowork = Cowork.find_by(uniqueKey: params[:uniqueKey]) rescue false
        if cowork.present?
            meeting_rooms = MeetingRoom.where(cowork_id: cowork.id)
            if meeting_rooms.count > 0 
                render json: meeting_rooms, each_serializer: MeetingRoomSerializer, status: :ok
            else
                render json: {message: "Currently there are no meeting rooms provide through this cowork. Kindly select others"}, status: 422
            end
        else
            render json: {message: "Invalid Cowork Unique Key. Kindly check again."}, status: 422
        end
    end


    def find_by_date_and_time
        zone = ActiveSupport::TimeZone.new("Asia/Kolkata")
        fromTime = Time.parse(params[:fromTime]) rescue nil
        toTime = Time.parse(params[:toTime]) rescue nil
        fromDate = Date.parse(params[:fromDate]) rescue nil
        toDate = Date.parse(params[:toDate]) rescue nil
        cowork = Cowork.find_by(uniqueKey: params[:uniqueKey])
        if fromTime.present? && toTime.present? && toDate.present? && fromDate.present?
            if cowork.present?
                @result = TimeSlot.where('"from" >= ? and "to" <= ?', "%#{fromTime}%","%#{toTime}%" ).includes(:meeting_room, :available_date).where(time_slots: {isAvailable: true}, available_dates: {availability_date: fromDate..toDate}, meeting_rooms: {cowork_id: cowork.id})
                zone = ActiveSupport::TimeZone.new("Asia/Kolkata")
                response_data = []
                response_available_date = []
                response_available_time = []
                @result.each do |data|
                    result_object = {}
                    address_object = {}
                    time_object = {}
                    result_object[:meeting_room_id] = data.meeting_room_id
                    result_object[:meeting_room_name] = data.meeting_room.name
                    result_object[:meeting_room_address] = data.meeting_room.cowork.address
                    result_object[:cowork_unique_key] = data.meeting_room.cowork.uniqueKey
                    if response_available_date.find{ |pdata| pdata[:available_date_id] == data.available_date_id }.present?
                        if response_available_time.find{ |tdata| tdata[:time_slot_id] != data.id }.present?
                            time_object[:time_slot_id] = data.id
                            time_object[:timing] = data.from.strftime("%I:%M %p") + " to " + data.to.strftime("%I:%M %p")
                            response_available_time << time_object
                        else
                            response_available_time = []
                        end
                        address_object[:time_slot] = []
                        address_object[:time_slot] << response_available_time
                        response_available_date << address_object
                    else
                        response_available_date = []
                        address_object[:available_date_id] = data.available_date_id
                        address_object[:available_date] = data.available_date.availability_date
                        time_object[:time_slot_id] = data.id
                        time_object[:timing] = data.from.strftime("%I:%M %p") + " to " + data.to.strftime("%I:%M %p")
                        response_available_time << time_object
                        address_object[:time_slot] = []
                        address_object[:time_slot] = response_available_time
                        response_available_date << address_object
                    end
                    result_object[:allocated_times] = response_available_date
                    response_data << result_object
                end
                response_data = "No meeting rooms were available for the given search criteria." if response_data.count == 0
                render json: {data: response_data}, status: :ok
            else
                render json: {message: "Invalid Cowork Unique Key. Kindly check again."}, status: 422
            end
        else
            render json: {message: "Invalid Date/Time. Kindly check again."}, status: 422
        end
    end

end