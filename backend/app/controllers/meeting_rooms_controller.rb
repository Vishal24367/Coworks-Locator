class MeetingRoomsController < ApplicationController

    def index
        cowork = Cowork.find_by(uniqueKey: params[:uniqueKey]) rescue false
        if cowork.present?
            meeting_rooms = MeetingRoom.where(cowork_id: cowork.id)
            if meeting_rooms.count > 0 
                @query_meeting_rooms = TimeSlot.includes(:meeting_room, :available_date).where(time_slots: {isAvailable: true}, meeting_rooms: {cowork_id: cowork.id})
                serialized_data = serialized_time_slots(@query_meeting_rooms)
                render json: {data: serialized_data}, status: :ok
            else
                render json: {message: "Currently there are no meeting rooms provide through this cowork. Kindly select others"}, status: 422
            end
        else
            render json: {message: "Invalid Cowork Unique Key. Kindly check again."}, status: 422
        end
    end


    def find_by_date_and_time
        fromTime = Time.parse(params[:fromTime]) rescue nil
        toTime = Time.parse(params[:toTime]) rescue nil
        fromDate = Date.parse(params[:fromDate]) rescue nil
        toDate = Date.parse(params[:toDate]) rescue nil
        cowork = Cowork.find_by(uniqueKey: params[:uniqueKey])
        if fromTime.present? && toTime.present? && toDate.present? && fromDate.present?
            if cowork.present?
                @result = TimeSlot.where('"from" >= ? and "to" <= ?', "%#{fromTime}%","%#{toTime}%" ).includes(:meeting_room, :available_date).where(time_slots: {isAvailable: true}, available_dates: {availability_date: fromDate..toDate}, meeting_rooms: {cowork_id: cowork.id})
                serialized_data = serialized_time_slots(@result)
                render json: {data: serialized_data}, status: :ok
            else
                render json: {message: "Invalid Cowork Unique Key. Kindly check again."}, status: 422
            end
        else
            render json: {message: "Invalid Date/Time. Kindly check again."}, status: 422
        end
    end

    private
        def serialized_time_slots(time_slot_query_data)
            response_data = []
            response_available_date = []
            response_available_time = []
            time_slot_query_data.each do |data|
                result_object = {}
                date_object = {}
                time_object = {}
                if response_data.find{|rdata| rdata[:meeting_room_id] == data.meeting_room_id}.present?
                    if response_available_date.find{|rdata| rdata[:availability_date_id] == data.available_date_id}.present?
                        if response_available_time.find{|rtime| rtime[:time_slot_id] != data.id}.present?
                            time_object[:time_slot_id] = data.id
                            time_object[:timing] = data.from.strftime("%I:%M %p") + " to " + data.to.strftime("%I:%M %p")
                            response_available_time << time_object
                        else
                            response_available_time = Array.new
                        end
                    else
                        time_object[:time_slot_id] = data.id
                        time_object[:timing] = data.from.strftime("%I:%M %p") + " to " + data.to.strftime("%I:%M %p")
                        response_available_time = Array.new
                        response_available_time << time_object
                        date_object[:availability_date_id] = data.available_date_id
                        date_object[:available_date] = data.available_date.availability_date
                        date_object[:time_slots] = response_available_time
                        response_available_date << date_object
                        result_object[:allocated_times] = response_available_date
                    end
                else
                    result_object[:meeting_room_id] = data.meeting_room_id
                    result_object[:meeting_room_name] = data.meeting_room.name
                    result_object[:meeting_room_address] = data.meeting_room.cowork.address
                    result_object[:cowork_unique_key] = data.meeting_room.cowork.uniqueKey
                    result_object[:allocated_times] = Array.new
                    time_object[:time_slot_id] = data.id
                    time_object[:timing] = data.from.strftime("%I:%M %p") + " to " + data.to.strftime("%I:%M %p")
                    response_available_time = Array.new
                    response_available_date = Array.new
                    response_available_time << time_object
                    date_object[:availability_date_id] = data.available_date_id
                    date_object[:available_date] = data.available_date.availability_date
                    date_object[:time_slots]  = response_available_time
                    response_available_date << date_object
                    result_object[:allocated_times] = response_available_date
                    response_data << result_object
                end
            end
            response_data = "No meeting rooms were available for the given search criteria." if response_data.count == 0
            response_data
        end

end