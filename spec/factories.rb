require 'faker'

FactoryBot.define do
  factory :timesheet_entry, class: TimesheetEntry do
    date { Faker::Date.in_date_period }
    client_name { Faker::Company.name }
    project_name { Faker::Lorem.sentence(word_count: 3) }
    project_code { Faker::String.random(length: 6) }
    hours { Faker::Number.decimal(l_digits: 2) }
    billable { Faker::Boolean }
    contributor_first_name { Faker::Name.first_name }
    contributor_last_name { Faker::Name.last_name }
    billable_rate { billable == true ? Faker::Number.between(from: 10, to: 70) : 0 }
  end
end