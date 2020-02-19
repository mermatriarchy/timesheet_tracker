# Timesheet Tracker
A basic form for recording timesheet entries & viewing project totals built with Ruby on Rails & React.

## Installation
These instructions assume macOs as the operating system & that a user has React & Ruby on Rails installed.
Download/pull the folder down from the repo and run:<br>
`bundle install`<br>
You might need to run:<br>
`yarn install --check-files`<br>
before<br>
`rake db:schema:load db:seed`<br>
To see the app running, run:<br>
`rails s` or `rails server`<br>
from the root directory and open a browser tab at:<br>
`localhost:3000`<br>
(or wherever you default port runs)

For backend tests run:<br>
`bundle exec rspec`<br>
For front-end tests run:<br>
`yarn test`

## Notes, Process & Scalability
I used Ruby on Rails & React because they're the libraries/frameworks I'm most comfortable using & have the most experience with. If this app were to grow in size & complexity, I would've set up my database tables a bit differently. Inititally, I was planning on setting them up [like this](https://drive.google.com/file/d/1swzlVIlYwa9kfIIQGNXQjI65CzsynPGF/view?usp=sharing), but decided to keep things simple because I wanted to be able to build an app with fuller test coverage. I figured that introducing complexity would require writing more tests, but I wanted to be able to write test coverage within the time I was given, so I opted for a single table. 

Additionally, I'd make some of the calculations more dynamic. For this app, a project was either billable or not, but I'd like to be able to calculate the percentage billable/not billable instead of just rendering 100% or 0% billable in the table. I'd also add some rules/validations in the controller or in the input form to make sure that a user couldn't enter an hourly rate for projects that had already been marked as not billable. (Having relational tables with reference columns would also help with this.)

I used Bootstrap-React because they have easy-to-use form & table components, though I did not incorporate a form validation library with this app. Bootstrap examples use the `Formik` package, but I don't have experience implementing it & didn't want to spend time troubleshooting when there were work-arounds I felt I could implement within the time I had to build the app (basically, I think about [this](https://jscomplete.com/learn/pro-programmer/beginner-programmers-mistakes) all the time when I’m working on projects.). My company uses `Joi` for form validation, but its last update was ~2 years ago (we're working on an earlier version of React at my job), so I didn't want to risk using something that's incompatible or not maintained. The alerts work well enough for this single form, but as the app grows in size & complexity, I would concentrate on updating the form validation to be more robust. 

For styling, I would switch to scss for any custom styling on top of Bootstrap because it's easier to read/write/maintain with larger apps - this app needed so little custom styling that I just used css.

Lastly, I would implement something like Redux to handle storing the state, assuming that the state object will get more complex over time & will need to be accesible to multiple components. 

## Tests
### Rspec
Rspec is used for backend testing. It's configured with FactoryBot to stub data & SimpleCov to look at coverage. I was able to write enough tests to get pretty full coverage on the back-end, but I think there are one or two methods in the `timesheet_entries_controller` that need more thorough tests.

### Jest
I installed Jest to write some tests for the front-end components in this project, but didn't really have time to cover everything. I’m not particularly dogmatic about Jest, but I’m comfortable with it & I’ve been able to teach myself how to implement it with online tutorials pretty easily & it reminds me a lot of rspec, but maybe that's just testing syntax. This project doesn’t have full test coverage because I ran out of time, but I wanted to demonstrate an understanding of testing & set up the infrastructure for it. These are typically the things I aim for in writing front-end test coverage:
1. Component rendering - does the component render correctly?
2. Props - does the component return the default props? Can it receive a custom value & match the prop afterthe component renders? (e.g. does the table return expected props on load? Will the "Billable Hours" item change if we send it a new prop?)
3. Data types - what kind of data is returned from the different components? e.g. does the `checkEntries` state return a boolean?
4. Events - was the event called? Was the expected behavior executed when the event is simulated? e.g. does the submit action work when all entries are valid? Is the appropriate error triggered when entries are not valid?
5. Conditions - does the component render differently based on the conditions? e.g. the error message should render instead of the table if the API call fails.

I've read extremely mixed/varied perspectives on testing state, but I try to avoid it because it's easier to validate what's been rendered. It keeps tests more consistent in case of refactoring things (like replacing class with functional components, renaming state/instance members, lifting state up, connecting components to Redux etc) that might break tests because of updated naming conventions, even though the output is still the same.
