require 'rails_helper'

describe Api::V1::TimesheetEntriesController, type: :controller do

  describe "GET /api/v1/timesheet_entries", :type => :request do
    let!(:entries) {FactoryBot.create_list(:timesheet_entry, 20)}
    let!(:hours_array) {[]}
    let!(:cost_array) {[]}

    before do
      entries.each do |entry|
        hours_array.push(entry['hours'])
        cost_array.push(entry['billable_rate'])
      end
      hours_array.inject(:+)
      cost_array.inject(:+)
    end
    
    let!(:grand_totals) {{'total_billable_amount' => hours_array,
                          'total_hours' =>  hours_array}}

    context 'when sort by project is false' do
      let!(:sort_by_project) { false }
      let!(:timesheet_entries) {{'grand_totals' => grand_totals, 
                                 'sort_by_project' => sort_by_project, 
                                 'entries' => entries}}
      before {get '/api/v1/timesheet_entries'}  
      
      it 'returns all questions' do
        expect(JSON.parse(response.body).size).to eq(3)
        expect(JSON.parse(response.body)['entries'].size).to eq(20)
      end  
      it 'returns status code 200' do
        expect(response).to have_http_status(:success)
      end
    end

    context 'when sort by project is true' do
      before {get '/api/v1/timesheet_entries'}
      
      it 'returns questions sorted by project' do
      end

      it 'returns status code 200' do
      end
    end
  end

  describe "POST /api/v1/timesheet_entries", :type => :request do
    context 'when the request is valid' do
      before do
        post '/api/v1/timesheet_entries', params: { timesheet_entry: { date: "2020/01/05", client_name: "Smoothie Co", project_name: "Website Redesign",
                                                    project_code: "B5V004", hours: 4.2, billable: true, contributor_first_name: "Alex",
                                                    contributor_last_name: "McCarren", billable_rate: 80 }}
      end  
      it 'returns the entry\'s date' do
        expect(JSON.parse(response.body)['date']).to eq('2020-01-05')
      end  
      it 'returns the entry\'s client' do
        expect(JSON.parse(response.body)['client_name']).to eq('Smoothie Co')
      end  
      it 'returns the entry\'s project name' do
        expect(JSON.parse(response.body)['project_name']).to eq('Website Redesign')
      end  
      it 'returns the entry\'s project code' do
        expect(JSON.parse(response.body)['project_code']).to eq('B5V004')
      end  
      it 'returns the entry\'s hours' do
        expect(JSON.parse(response.body)['hours']).to eq(4.2)
      end
  
      it 'returns the entry\'s billable status' do
        expect(JSON.parse(response.body)['billable']).to eq(true)
      end  
      it 'returns the entry\'s contributor name' do
        expect(JSON.parse(response.body)['contributor_first_name']).to eq('Alex')
        expect(JSON.parse(response.body)['contributor_last_name']).to eq('McCarren')
      end
  
      it 'returns the entry\'s billable rate' do
        expect(JSON.parse(response.body)['billable_rate']).to eq(80)
      end
  
      it 'returns a created status' do
        expect(response).to have_http_status(:created)
      end
    end

    context 'when the request is invalid' do
      before do
          post '/api/v1/timesheet_entries', params: { timesheet_entry: { date: "2020/01/05", client_name: '', project_name: "Website Redesign",
                                                      project_code: "B5V004", hours: 4.2, billable: true, contributor_first_name: "Alex",
                                                      contributor_last_name: "McCarren", billable_rate: 80 }}
      end  

      it 'returns an error' do
        expect(JSON.parse(response.body)['errors']).to eq("client_name"=>["can't be blank"])
      end
    end
  end

  describe "PUT /api/v1/timesheet_entries/:id" do
    before(:each) do
        @entry = create(:timesheet_entry)
        @new_hours = Faker::Number.decimal(l_digits: 2)
        put 'update', params: { timesheet_entry: { id: @entry.id, entry: { hours: @new_hours} }}
    end

    it 'responds with a success status' do
      expect(response.status).to eq(200)
    end

    it 'updates the entry correctly' do
      expect(TimesheetEntry.find(@entry.id).hours).to eq(@new_hours)
    end
  end
end