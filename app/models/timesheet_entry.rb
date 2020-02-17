class TimesheetEntry < ApplicationRecord
    attr_accessor :total_billable_amount, :total_hours
    
    validates_presence_of :date, :client_name, :project_name, :project_code, :hours, :billable, 
                          :contributor_first_name, :contributor_last_name, :billable_rate

    def self.total_billable_amount
      TimesheetEntry.sum("billable_rate * hours").round(2)
    end

    def self.total_hours
      TimesheetEntry.sum(:hours).round(2)
    end
end
