class Api::V1::TimesheetEntriesController < Api::V1::BaseController
  skip_before_action :verify_authenticity_token

  def index
    sort_by_project = ActiveModel::Type::Boolean.new.cast(params[:sort_by_project])

    if sort_by_project
      entries = TimesheetEntry.select(:client_name, :project_name, :billable, "SUM(billable_rate * hours) AS billable_amount", "SUM(hours) AS total_project_hours")
                              .group(:project_name)

      entries.each do |entry|
        entry["billable_amount"] = (entry["billable_amount"]).round(2)
        entry["total_project_hours"] = (entry["total_project_hours"]).round(2)
      end
      
      entries
    else
      entries = TimesheetEntry.order(date: :ASC)
    end

    grand_totals = { total_billable_amount: TimesheetEntry.total_billable_amount, 
                     total_hours:  TimesheetEntry.total_hours }

    data = { grand_totals: grand_totals, sort_by_project: sort_by_project, entries: entries }

    respond_with data, json: data
  end
  
  def create
    respond_with :api, :v1, TimesheetEntry.create(entry_params)
  end

=begin
  # I was planning on adding some extras if I had time

  def show
    respond_with TimesheetEntry.find(params[:id])
  end

  def destroy
    respond_with TimesheetEntry.destroy(params[:id])
  end

  def update
    entry = TimesheetEntry.find(params['id'])
    entry.update_attributes(entry_params)
    respond_with entry, json: entry
  end
=end

  private

  def entry_params
    params.require(:timesheet_entry).permit(
      :date,
      :client_name,
      :project_name,
      :project_code,
      :hours,
      :billable,
      :contributor_first_name,
      :contributor_last_name,
      :billable_rate,
      :sort_by_project
    )
  end
end