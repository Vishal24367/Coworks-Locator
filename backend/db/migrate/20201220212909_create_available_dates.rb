class CreateAvailableDates < ActiveRecord::Migration[5.2]
  def change
    create_table :available_dates do |t|
      t.date :availability_date
      t.references :meeting_room, index: true, foreign_key: true
      
      t.timestamps
    end
  end
end
