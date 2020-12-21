class CreateCoworks < ActiveRecord::Migration[5.2]
  def change
    create_table :coworks do |t|
      t.string :name
      t.text :address
      t.string :uniqueKey
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
  end
end
