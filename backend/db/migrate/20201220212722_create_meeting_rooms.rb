class CreateMeetingRooms < ActiveRecord::Migration[5.2]
  def change
    create_table :meeting_rooms do |t|
      t.string :name
      t.references :cowork, index: true, foreign_key: true
      
      t.timestamps
    end
  end
end
