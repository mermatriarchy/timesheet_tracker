class TimesheetEntry < ApplicationRecord
    validates_presence_of :date, :client_name, :project_name, :project_code, :hours, :billable, 
                          :contributor_first_name, :contributor_last_name, :billable_rate
end
