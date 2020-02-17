class Api::V1::TimesheetEntriesController < Api::V1::BaseController
  def index
    sort_by_project = ActiveModel::Type::Boolean.new.cast(params[:sort_by_project])

    if sort_by_project
      entries = TimesheetEntry.select(:client_name, :project_name, :billable, "SUM(billable_rate * hours) AS billable_amount", "SUM(hours) AS total_hours")
                              .group(:project_name)
      
      entries.each do |entry|
        entry["billable_amount"] = (entry["billable_amount"]).round(2)
        entry["total_hours"] = (entry["total_hours"]).round(2)
      end

      entries
    else
      entries = TimesheetEntry.order(date: :ASC)
    end

    respond_with entries, json: entries
  end
  
  def show
    respond_with TimesheetEntry.find(params[:id])
  end
  
  def create
    respond_with :api, :v1, TimesheetEntry.create(entry_params)
  end

  def destroy
    respond_with TimesheetEntry.destroy(params[:id])
  end

  def update
    entry = TimesheetEntry.find(params['id'])
    entry.update_attributes(entry_params)
    respond_with entry, json: entry
  end

  def formatted_date(val)
    date = Date.strptime(val, "%m/%d/%y") if val.present?
  end

  private

  def entry_params
    params.require(:entry).permit(
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