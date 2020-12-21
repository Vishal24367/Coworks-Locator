# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

radius = 1
lat = (28.664622668010022).to_f
long = (77.46368752267081).to_f
circlePoints = []
i = 0
coworksCount = 30.to_i
while i < coworksCount do
    angle = Math::PI*2*i/coworksCount
    dx = radius * Math.cos(angle)
    dy = radius * Math.sin(angle)
    point = {}
    nameValue = "Coworks-1"+(i+1).to_s
    addressValue = SecureRandom.alphanumeric
    uniqueKeyValue = SecureRandom.hex
    latValue = lat + (180/Math::PI) * (dy/6371) #Earth Radius
    longValue = long + (180/Math::PI) * (dx/6371)/Math.cos(long*Math::PI/180) #Earth Radius
    # create random coworks with random data
    Cowork.create!(name: "Coworks-"+(i+1).to_s, address: addressValue, uniqueKey: uniqueKeyValue, latitude: latValue, longitude: longValue)
    circlePoints << point
    i = i + 1
end

coworks = Cowork.all

coworks.each do |data|
    i = 0
    while i < rand(1...10) do
        MeetingRoom.create!(name: "MeetingRoom-"+(i+1).to_s, cowork_id: data.id)
        i = i + 1
    end
end

meeting_rooms = MeetingRoom.all

meeting_rooms.each do |data|
    i = 0
    while i < rand(1...10) do
        AvailableDate.create!(availability_date: Date.today+rand(100), meeting_room_id: data.id)
        i = i + 1 
    end
end

def random_hour(from, to)
    (Date.today + rand(from..to).hour + rand(0..60).minutes).to_datetime
end

all_availability_dates = AvailableDate.all

all_availability_dates.each do |data|
    i = 0
    while i < rand(1...10) do
        fromRandValue = rand(1...12)
        toRandValue = rand(12...23)
        toValue = random_hour(fromRandValue, toRandValue)
        fromRandValue = rand(1...12)
        toRandValue = rand(12...23)
        fromValue = random_hour(fromRandValue, fromRandValue)
        if fromValue > toValue
            thirdValue = fromValue
            fromValue = toValue
            toValue = thirdValue
        end
        TimeSlot.create!(name: "Slot-"+(i+1).to_s, isAvailable: true, from: fromValue, to: toValue, available_date_id: data.id)
        i = i + 1
    end
end

