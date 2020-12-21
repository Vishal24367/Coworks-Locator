class CreateTimeSlots < ActiveRecord::Migration[5.2]
  def change
    create_table :time_slots do |t|
      t.string :name
      t.time :from
      t.time :to
      t.boolean :isAvailable
      t.references :available_date, index: true, foreign_key: true

      t.timestamps
    end
  end
end
