class Api::V1::TimesheetEntriesController < Api::V1::BaseController
  def index
    respond_with TimesheetEntry.order(date: :ASC)
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
      :billable_rate
    )
  end
end