# frozen_string_literal: true

require 'rails_helper'
require 'vcr'
require 'faker'

RSpec.feature 'RFA01A', js: true, inaccessible: true do

  before(:each) do
    visit root_path
    page.driver.browser.manage.window.resize_to 1200, 800
    end
    scenario 'Dashboard page', set_auth_header: true do
        expect(page).to have_button('Create RFA Application')
    end

  scenario 'validate applicant card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application'
    expect(page).to have_content 'Applicant 1 - Information'
  end

  scenario 'validate full applicant card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application'
    expect(page).to have_content 'Applicant 1 - Information'
    expect(page).to have_button('Save Progress', disabled: true)
    expect(page).to have_select('minor_children[0].minor_gender', with_options: ['', 'Male', 'Female'])
    expect(page).to have_select('residenceTypes', with_options: %w[Own Rent Lease])
    fill_in('applicants[0].first_name', with: Faker::Name.first_name, match: :prefer_exact)
    fill_in('applicants[0].middle_name', with: 'k', match: :prefer_exact)
    expect(page).to have_button('Save Progress', disabled: true)
    fill_in('applicants[0].last_name', with: Faker::Name.last_name, match: :prefer_exact)
    expect(page).to have_button('Save Progress', disabled: false)
    fill_in 'applicants[0].driver_license_number', with: 'ABC123'
    expect(page).to have_content 'IV. Minor Children Residing in the Home'
    expect(page).to have_content 'VIII. Foster Care / Adoption / Licensure History'
    expect(page).to have_content 'More About Applicant'
    expect(page).to have_content 'IX. References'
    select 'Some High School', from: 'highest_education_level'
    select 'Black', from: 'ethnicity'
    select 'Alaska', from: 'applicants[0].driver_license_state'
    fill_in('Email Address', with: 'test@test.com', match: :prefer_exact)
    expect(page).to have_content 'Employment'
    fill_in('Name of the Employer', with: 'Employer Name', match: :prefer_exact)
    fill_in('Occupation', with: 'Front End Developer', match: :prefer_exact)
    fill_in('income', with: '10', match: :prefer_exact)
    fill_in('Residentialstreet_address', with: '2870 Gateway', match: :prefer_exact)
    fill_in('Zip', with: '94403', match: :prefer_exact)
    fill_in('City', with: 'Sacremento', match: :prefer_exact)
    expect(page).to have_content 'Phone Number'
    fill_in 'applicants[0].phones[0].number', with: '201-222-2345'
    click_button('Save Progress')
    #visit page.driver.current_url
    expect(find_field('highest_education_level').value).to eq '2'
    expect(find_field('ethnicity').value).to eq '4'
    expect(find_field('applicants[0].driver_license_number').value).to eq 'ABC123'
    expect(find_field('applicants[0].driver_license_state').value).to eq 'AK'
    expect(find_field('employer_name').value).to eq 'Employer Name'
    expect(find_field('occupation').value).to eq 'Front End Developer'
    expect(find_field('income').value).to eq '$10'
    expect(find_field('income_type').value).to eq '1'
    expect(find_field('applicants[0].phones[0].number').value).to eq '(201) 222-2345'
  end

  scenario 'validate remove button, applicant card', set_auth_header: true do
    click_button 'Create RFA Application'
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('applicants[0].first_name', with: Faker::Name.first_name, match: :prefer_exact)
    fill_in('applicants[0].middle_name', with: 'k', match: :prefer_exact)
    fill_in('applicants[0].last_name', with: Faker::Name.last_name, match: :prefer_exact)
    click_button 'Add Another Applicant +'
    expect(page).to have_content('Applicant 2 - Information')
    fill_in('applicants[1].first_name', with: Faker::Name.first_name, match: :prefer_exact)
    fill_in('applicants[1].last_name', with: Faker::Name.last_name, match: :prefer_exact)
    click_button 'Save Progress'
    fill_in('relationship_to_applicant0child0relationship_to_applicant_freeform', with: 'Son', match: :prefer_exact)
    find('#child_financially_supported0child0Yes').click
    find('#child_adopted0child0Yes').click
    fill_in('relationship_to_applicant0child1relationship_to_applicant_freeform', with: 'Son', match: :prefer_exact)
    find('#child_financially_supported0child1Yes').click
    find('#child_adopted0child1Yes').click
    fill_in('minor_children[0].date_of_birth', with: '10/11/1999', match: :prefer_exact)
    select 'Male', from: 'minor_children[0].minor_gender'
    click_button 'Save Progress'
    applicant_cards = page.all('#applicants-card')
    expect(applicant_cards[2].find('.applicant-list-remove-btn')).to have_content('Remove')
    applicant_cards[2].find('.applicant-list-remove-btn').click
    expect(page).not_to have_content 'Applicant 2 - Information'
    click_button 'Save Progress'
    expect(page).not_to have_content 'Applicant 2 - Information'
  end

  scenario 'validate submit button functionality', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application'
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in('applicants[0].first_name', with: 'Geovanni', match: :prefer_exact)
    expect(page).to have_button('Save Progress', disabled: true)
    expect(page).to have_button('Submit', disabled: true)
    fill_in('applicants[0].last_name', with: 'Moen', match: :prefer_exact)
    expect(page).to have_button('Save Progress', disabled: false)
    expect(page).to have_button('Submit', disabled: true)
    fill_in('applicants[0].date_of_birth', with: '11/11/1996', match: :prefer_exact)
    select 'Male', from: 'applicants[0].gender'
    expect(page).to have_content 'Phone Number'
    fill_in 'applicants[0].phones[0].number', with: '201-222-2345'
    page.find('#residentAddress').fill_in('Residentialstreet_address', with: '2870 something else', match: :prefer_exact)
    page.find('#residentAddress').fill_in('Residentialzip', with: '12345', match: :prefer_exact)
    page.find('#residentAddress').fill_in('Residentialcity', with: 'Sacremento', match: :prefer_exact)
    find('#react-select-3--value').click
    find('#react-select-3--option-5').click
    find('#mailing_similarYes').click
    expect(page).to have_content 'About This Residence'
    select 'Own', from: 'residenceTypes'
    find('#weaponsYes').click
    find('#body_of_water_existYes').click
    find('#others_using_residence_as_mailingYes').click
    fill_in('residence.other_people_using_residence_as_mailing[0].first_name', with: Faker::Name.first_name, match: :prefer_exact)
    fill_in('residence.other_people_using_residence_as_mailing[0].last_name', with: Faker::Name.first_name, match: :prefer_exact)
    page.find(:css, '.languages').click
    page.find(:css, '#react-select-2--option-0').click
    page.find(:css, '.languages').click
    page.find(:css, '#react-select-2--option-1').click
    expect(page).to have_button('Submit', disabled: false)
    expect(page).to have_content 'IV. Minor Children Residing in the Home'

    fill_in('relationship_to_applicant0child0relationship_to_applicant_freeform', with: 'child', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: true)
    fill_in('minor_children[0].date_of_birth', with: '11/11/2008', match: :prefer_exact)
    select 'Male', from: 'applicants[0].gender'
    find('#child_financially_supported0child0Yes').click
    find('#child_adopted0child0Yes').click
    select 'Male', from: 'minor_children[0].minor_gender'
    expect(page).to have_button('Submit', disabled: false)

    click_button 'Add another minor +'
    fill_in('relationship_to_applicant1child0relationship_to_applicant_freeform', with: 'child', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: true)
    fill_in('minor_children[1].date_of_birth', with: '11/11/2007', match: :prefer_exact)
    select 'Male', from: 'applicants[0].gender'
    find('#child_financially_supported1child0Yes').click
    find('#child_adopted1child0Yes').click
    select 'Male', from: 'minor_children[1].minor_gender'
    expect(page).to have_button('Submit', disabled: false)


    fill_in('relationship_to_applicants0adult0relationship_to_applicant_freeform', with: 'child', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: true)
    fill_in('other_adults[0].date_of_birth', with: '12/12/1976', match: :prefer_exact)
    select 'Male', from: 'applicants[0].gender'
    fill_in('other_adults[0].first_name', with: 'Peter', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: true)
    fill_in('other_adults[0].last_name', with: 'Smith', match: :prefer_exact)

    expect(page).to have_button('Submit', disabled: false)
    click_button 'Add another Adult +'
    fill_in('relationship_to_applicants1adult0relationship_to_applicant_freeform', with: 'child', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: true)
    fill_in('other_adults[1].date_of_birth', with: '12/12/1986', match: :prefer_exact)
    select 'Male', from: 'applicants[0].gender'
    fill_in('other_adults[1].first_name', with: 'Jim', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: true)
    fill_in('other_adults[1].last_name', with: 'Tucker', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: false)
    click_button('Save Progress')
    visit page.driver.current_url
    click_link('Geovanni Moen')
    fill_in('NameOfResourceFamily', with: 'test', match: :prefer_exact)
    click_button('Save Progress')
    click_link('Peter Smith')
    fill_in('NameOfResourceFamily', with: 'test1', match: :prefer_exact)
    click_button('Save Progress')
    click_link('Jim Tucker')
    fill_in('NameOfResourceFamily', with: 'test2', match: :prefer_exact)
    click_button('Save Progress')
    visit page.driver.current_url
    click_link('Applicant Information')
    click_button('Save Progress')
    click_button 'Submit'
    expect(page).to have_button('Submit', disabled: true)
    visit page.driver.current_url
    expect(page).to have_button('Submit', disabled: true)
    fill_in('applicants[0].first_name', with: 'G', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: true)


  end

  scenario 'prevent backspace navigation on IE', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application'
    expect(page).to have_content 'Applicant 1 - Information'
    select 'Mr.', from: 'name_prefix', match: :first
    page.first('select#name_prefix').send_keys :backspace
    expect(page).to have_content 'Applicant 1 - Information'
    fill_in 'applicants[0].phones[0].number', with: "\t"
    page.first('select#phone_type').send_keys :backspace
    expect(page).to have_content 'Applicant 1 - Information'
    find('#addAnotherNumber').send_keys :tab
    find('#addAnotherApplicant').send_keys :backspace
    expect(page).to have_content 'Applicant 1 - Information'
  end

  scenario 'validate Residence card', set_auth_header: true do
    visit root_path
    click_button 'Create RFA Application'
    fill_in('applicants[0].first_name', with: Faker::Name.first_name, match: :prefer_exact)
    fill_in('applicants[0].middle_name', with: 'k', match: :prefer_exact)
    fill_in('applicants[0].last_name', with: Faker::Name.last_name, match: :prefer_exact)
    expect(page).to have_content 'IV. Minor Children Residing in the Home'
    fill_in('Residentialstreet_address', with: '2870 something else', match: :prefer_exact)
    fill_in('Residentialzip', with: '12345', match: :prefer_exact)
    find('#mailing_similarNo').click
    fill_in('Mailingstreet_address', with: 'mailing address here', match: :prefer_exact)
    fill_in('Mailingzip', with: '12345', match: :prefer_exact)
    fill_in('Mailingcity', with: 'secondary city', match: :prefer_exact)
    expect(page).to have_content 'About This Residence'
    select 'Own', from: 'residenceTypes'
    find('#weaponsYes').click
    find('#body_of_water_existYes').click
    find('#others_using_residence_as_mailingYes').click
    within '.residence_about_cards' do
        select 'Mr.', from: 'residence.other_people_using_residence_as_mailing[0].name_prefix'
        fill_in('residence.other_people_using_residence_as_mailing[0].first_name', with: Faker::Name.first_name, match: :prefer_exact)
        fill_in('residence.other_people_using_residence_as_mailing[0].last_name', with: Faker::Name.last_name, match: :prefer_exact)
        select 'II', from: 'residence.other_people_using_residence_as_mailing[0].name_suffix'
        expect(page).to have_content('ADD ANOTHER PERSON +')
        click_button('Add Another Person +')
        second_person = find(:xpath, '//*[@id="aboutResidence"]/div[2]/div/div/div/div/div[6]/div[2]')
        within second_person do
            select 'Miss', from: 'residence.other_people_using_residence_as_mailing[1].name_prefix'
            fill_in('residence.other_people_using_residence_as_mailing[1].first_name', with: Faker::Name.first_name, match: :prefer_exact)
            fill_in('residence.other_people_using_residence_as_mailing[1].last_name', with: Faker::Name.last_name, match: :prefer_exact)
            select 'MD', from: 'residence.other_people_using_residence_as_mailing[1].name_suffix'
        end
    end
    fill_in('directions', with: 'directions goes here', match: :prefer_exact)
    page.find(:css, '.languages').click
    page.find(:css, '#react-select-2--option-0').click
    page.find(:css, '.languages').click
    page.find(:css, '#react-select-2--option-1').click
    expect(page).to have_css(:span, text: 'American Sign Language')
    expect(page).to have_css(:span, text: 'Armenian')
    click_button('Save Progress')
    visit page.driver.current_url

    expect(find_field('residenceTypes').value).to eq '1'
    expect(find_field('mailing_similartrue').value).to eq 'true'
    expect(find_field('weaponstrue').value).to eq 'true'
    expect(find_field('body_of_water_existtrue').value).to eq 'true'
    expect(find_field('others_using_residence_as_mailingtrue').value).to eq 'true'
  end

  scenario 'Other adult and minor information are saved with reference to applicant',  set_auth_header: true do
    visit root_path
    page.driver.browser.manage.window.resize_to 1200, 800
    click_button 'Create RFA Application'
    page.driver.browser.manage.window.resize_to 1200, 800
    applicant_0_first_name = 'rick'
    applicant_0_last_name = 'sanchez'

    fill_in('applicants[0].first_name', with: applicant_0_first_name, match: :prefer_exact)
    fill_in('applicants[0].last_name', with: applicant_0_last_name, match: :prefer_exact)
    fill_in('applicants[0].date_of_birth', with: '11/11/1111', match: :prefer_exact)
    select 'Male', from: 'applicants[0].gender'
    fill_in 'applicants[0].phones[0].number', with: '201-222-2345'

    applicant_1_first_name = 'jon'
    applicant_1_last_name = 'abernathy'
    click_button 'Add Another Applicant +'
    expect(page).to have_content('Applicant 2 - Information')
    fill_in('applicants[1].first_name', with: applicant_1_first_name, match: :prefer_exact)
    fill_in('applicants[1].last_name', with:   applicant_1_last_name, match: :prefer_exact)
    fill_in('applicants[1].date_of_birth', with: '11/11/1111', match: :prefer_exact)
    select 'Male', from: 'applicants[1].gender'
    fill_in 'applicants[1].phones[0].number', with: '201-222-2345'

    page.find('#residentAddress').fill_in('Residentialstreet_address', with: '2870 something else', match: :prefer_exact)
    page.find('#residentAddress').fill_in('Residentialzip', with: '12345', match: :prefer_exact)
    page.find('#residentAddress').fill_in('Residentialcity', with: 'Sacremento', match: :prefer_exact)
    find('#react-select-3--value').click
    find('#react-select-3--option-1').click
    find('#mailing_similarYes').click
    select 'Own', from: 'residenceTypes'
    find('#weaponsYes').click
    find('#body_of_water_existYes').click
    find('#others_using_residence_as_mailingYes').click
    fill_in('residence.other_people_using_residence_as_mailing[0].first_name', with: Faker::Name.first_name, match: :prefer_exact)
    fill_in('residence.other_people_using_residence_as_mailing[0].last_name', with: Faker::Name.first_name, match: :prefer_exact)
    page.find(:css, '.languages').click
    page.find(:css, '#react-select-2--option-0').click
    page.find(:css, '.languages').click
    page.find(:css, '#react-select-2--option-1').click
    expect(page).to have_content 'IV. Minor Children Residing in the Home'

    fill_in('relationship_to_applicant0child0relationship_to_applicant_freeform', with: 'child', match: :prefer_exact)
    fill_in('minor_children[0].date_of_birth', with: '11/11/1111', match: :prefer_exact)
    find('#child_financially_supported0child0Yes').click
    find('#child_adopted0child0Yes').click
    select 'Male', from: 'minor_children[0].minor_gender'

    other_adult_first_name = 'hiro'
    other_adult_last_name = 'protaganist'
    fill_in('relationship_to_applicants0adult0relationship_to_applicant_freeform', with: 'child', match: :prefer_exact)
    fill_in('other_adults[0].date_of_birth', with: '12/12/1211', match: :prefer_exact)
    fill_in('other_adults[0].first_name', with: other_adult_first_name, match: :prefer_exact)
    fill_in('other_adults[0].last_name', with: other_adult_last_name, match: :prefer_exact)

    click_button('Save Progress')
    visit page.driver.current_url
    click_link("#{applicant_0_first_name} #{applicant_0_last_name}")
    fill_in('NameOfResourceFamily', with: 'Name 0', match: :prefer_exact)
    click_button('Save Progress')
    click_link("1. Applicant Information")

    click_link("#{applicant_1_first_name} #{applicant_1_last_name}")
    fill_in('NameOfResourceFamily', with: 'Name 1', match: :prefer_exact)
    click_button('Save Progress')
    click_link("1. Applicant Information")

    click_link("#{other_adult_first_name} #{other_adult_last_name}")
    fill_in('NameOfResourceFamily', with: 'Name 2', match: :prefer_exact)
    click_button('Save Progress')
    click_link("1. Applicant Information")

    click_button('Submit')
    expect(page).not_to have_content('has no reference to any applicant')
    expect(page).not_to have_content('an exception occured: form-submission-validation')
    visit page.driver.current_url
  end
end
