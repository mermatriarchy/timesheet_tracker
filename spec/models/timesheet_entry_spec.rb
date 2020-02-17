require 'rails_helper'

describe TimesheetEntry, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of :client_name }
    it { is_expected.to validate_presence_of :project_name }
    it { is_expected.to validate_presence_of :project_code }
    it { is_expected.to validate_presence_of :hours }
    it { is_expected.to validate_presence_of :billable }
    it { is_expected.to validate_presence_of :contributor_first_name }
    it { is_expected.to validate_presence_of :contributor_last_name }
    it { is_expected.to validate_presence_of :billable_rate }
  end
end