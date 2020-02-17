require 'csv'

class TimesheetSeeder 
  def self.seed
    csv_text = File.read(Rails.root.join("db", "data", "timesheet_entries.csv"))
    csv = CSV.parse(csv_text, :headers => true)
    csv.each do |row|
      entry = TimesheetEntry.create!(date: Date.strptime(row["Date"], '%m/%d/%y'),
                                     client_name: row["Client"],
                                     project_name: row["Project"],
                                     project_code: row["Code"],
                                     hours: row["Hours"].to_f,
                                     billable: row["Billable?"] == "Yes" ? true : false,
                                     contributor_first_name: row["First Name"],
                                     contributor_last_name: row["Last Name"],
                                     billable_rate: row["Billable Rate"].to_i)
              
      puts "Entry for #{entry.project_name} from #{entry.date} saved"
    end
    puts "#{TimesheetEntry.count} entries added"
  end
end