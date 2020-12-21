# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_12_20_212940) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "available_dates", force: :cascade do |t|
    t.date "availability_date"
    t.bigint "meeting_room_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meeting_room_id"], name: "index_available_dates_on_meeting_room_id"
  end

  create_table "coworks", force: :cascade do |t|
    t.string "name"
    t.text "address"
    t.string "uniqueKey"
    t.float "latitude"
    t.float "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "meeting_rooms", force: :cascade do |t|
    t.string "name"
    t.bigint "cowork_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["cowork_id"], name: "index_meeting_rooms_on_cowork_id"
  end

  create_table "time_slots", force: :cascade do |t|
    t.string "name"
    t.time "from"
    t.time "to"
    t.boolean "isAvailable"
    t.bigint "available_date_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["available_date_id"], name: "index_time_slots_on_available_date_id"
  end

  add_foreign_key "available_dates", "meeting_rooms"
  add_foreign_key "meeting_rooms", "coworks"
  add_foreign_key "time_slots", "available_dates"
end
