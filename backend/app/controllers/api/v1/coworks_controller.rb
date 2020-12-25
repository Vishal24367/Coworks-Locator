class Api::V1::CoworksController < ApplicationController

    def index
        if params[:latitude] != nil && params[:longitude] != nil
            if params[:radius].to_f > 0
                if params[:offset].to_i > 0
                    coworks = Cowork.order(Arel.sql('RANDOM()')).first(params[:offset].to_i)
                    if coworks.count > 0
                        render json: coworks, each_serializer: CoworkSerializer, status: :ok
                    else
                        render json: {message: "No Coworks found currenlty. Please try again at another time."}, status: 422
                    end
                else
                    render json: {message: "Offset should be greater than 0."}, status: 422
                end
            else
                render json: {message: "Radius should be greater than 0."}, status: 422
            end
        else
            render json: {message: "Invalid location."}, status: 422
        end
    end

end