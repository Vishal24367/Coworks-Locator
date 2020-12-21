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
        #logic implemented on board first
    end

end