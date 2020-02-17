class CreateTimesheetEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :timesheet_entries do |t|
      t.date :date
      t.string :client_name
      t.string :project_name
      t.string :project_code
      t.float :hours
      t.boolean :billable
      t.string :contributor_first_name
      t.string :contributor_last_name
      t.integer :billable_rate

      t.timestamps
    end
  end
end
