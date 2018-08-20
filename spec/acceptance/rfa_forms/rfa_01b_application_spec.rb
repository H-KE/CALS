# frozen_string_literal: true

require 'rails_helper'
require 'vcr'
require 'faker'

RSpec.feature 'RFA01B', js: true, inaccessible: true do

  scenario 'validate rfa01b creation and fields', set_auth_header: true do
    visit root_path
    page.driver.browser.manage.window.resize_to 1200, 800
    click_button 'Create RFA Application'
    first_name = 'Dillon'
    last_name = 'Wisozk'
    fill_in('applicants[0].first_name', with: first_name, match: :prefer_exact)
    fill_in('applicants[0].last_name', with: last_name, match: :prefer_exact)

    find('#child_identifiedYes').click
    find('#child_in_homeYes').click

    click_button('Save Progress')
    visit page.driver.current_url
    expect(page).to have_content "#{first_name} #{last_name}"

    click_link("#{first_name} #{last_name}")
    fill_in('NameOfResourceFamily', with: 'test', match: :prefer_exact)
    fill_in('ssn', with: '123-45-6789', match: :prefer_exact)
    fill_in('driversLicenseNumberId', with: 'D123', match: :prefer_exact)
    find(:select, 'driversLicenseStateId').first(:option, 'Alaska').select_option
    find('[for=californiaCriminalBackgroundRadiotrue]').click
    fill_in('californiaCriminalBackgroundoffenseReason', with: 'test offense', match: :prefer_exact)
    fill_in('californiaCriminalBackgroundoffenseCity', with: 'test offense city', match: :prefer_exact)
    fill_in('californiaCriminalBackgroundOffenseDate', with: 'date of offense', match: :prefer_exact)
    fill_in('californiaCriminalBackgroundoffenseDetails', with: 'offense details', match: :prefer_exact)

    find('[for=crimeBackgroundAgainstCohabitantRadiotrue').click
    fill_in('crimeBackgroundAgainstCohabitantoffenseReason', with: 'cohab test offense', match: :prefer_exact)
    fill_in('crimeBackgroundAgainstCohabitantoffenseCity', with: 'cohab test offense city', match: :prefer_exact)
    fill_in('crimeBackgroundAgainstCohabitantOffenseDate', with: 'cohab date of offense', match: :prefer_exact)
    fill_in('crimeBackgroundAgainstCohabitantoffenseDetails', with: 'cohab offense details', match: :prefer_exact)

    find('[for=outsideCACriminalBackgroundtrue').click
    fill_in('outsideCaliforniaCriminalBackgroundoffenseReason', with: 'outside test offense', match: :prefer_exact)
    fill_in('outsideCaliforniaCriminalBackgroundoffenseCity', with: 'outside test offense city', match: :prefer_exact)
    fill_in('outsideCaliforniaCriminalBackgroundOffenseDate', with: 'outside date of offense', match: :prefer_exact)
    fill_in('outsideCaliforniaCriminalBackgroundoffenseDetails', with: 'outside offense details', match: :prefer_exact)

    click_button('Save Progress')
    visit page.driver.current_url

    expect(find_field('NameOfResourceFamily').value).to eq 'test'
    expect(find_field('ssn').value).to eq '123-45-6789'
    expect(find_field('driversLicenseNumberId').value).to eq 'D123'
    expect(find_field('californiaCriminalBackgroundoffenseReason').value).to eq 'test offense'
    expect(find_field('californiaCriminalBackgroundoffenseCity').value).to eq 'test offense city'
    expect(find_field('californiaCriminalBackgroundOffenseDate').value).to eq 'date of offense'
    expect(find_field('californiaCriminalBackgroundoffenseDetails').value).to eq 'offense details'

    expect(find_field('crimeBackgroundAgainstCohabitantoffenseReason').value).to eq 'cohab test offense'
    expect(find_field('crimeBackgroundAgainstCohabitantoffenseCity').value).to eq 'cohab test offense city'
    expect(find_field('crimeBackgroundAgainstCohabitantOffenseDate').value).to eq 'cohab date of offense'
    expect(find_field('crimeBackgroundAgainstCohabitantoffenseDetails').value).to eq 'cohab offense details'

    expect(find_field('outsideCaliforniaCriminalBackgroundoffenseReason').value).to eq 'outside test offense'
    expect(find_field('outsideCaliforniaCriminalBackgroundoffenseCity').value).to eq 'outside test offense city'
    expect(find_field('outsideCaliforniaCriminalBackgroundOffenseDate').value).to eq 'outside date of offense'
    expect(find_field('outsideCaliforniaCriminalBackgroundoffenseDetails').value).to eq 'outside offense details'
  end

  scenario 'validate rfa01b sideNav', set_auth_header: true do
    visit root_path
    page.driver.browser.manage.window.resize_to 1200, 800
    click_button 'Create RFA Application'

    first_name = 'alpha0'
    last_name = 'beta0'
    fill_in('applicants[0].first_name', with: first_name, match: :prefer_exact)
    fill_in('applicants[0].last_name', with: last_name, match: :prefer_exact)

    click_button('Add Another Applicant +')
    # fill in second applicant details
    second_applicant_first_name = 'alpha1'
    second_applicant_last_name = 'beta1'
    fill_in('applicants[1].first_name', with: second_applicant_first_name, match: :prefer_exact)
    fill_in('applicants[1].last_name', with: second_applicant_last_name, match: :prefer_exact)

    # find other adult section, add 1 other adult
    other_adult_first_name = 'alpha2'
    other_adult_last_name = 'beta2'
    fill_in('other_adults[0].first_name', with: other_adult_first_name, match: :prefer_exact)
    fill_in('other_adults[0].last_name', with: other_adult_last_name, match: :prefer_exact)
    click_button('Save Progress')
    visit page.driver.current_url
    expect(page).to have_content 'alpha0 beta0'
    expect(page).to have_content 'alpha1 beta1'
    expect(page).to have_content 'alpha2 beta2'
  end

  scenario 'validate submit disabled when 01a is not valid', set_auth_header: true do
    visit root_path
    page.driver.browser.manage.window.resize_to 1200, 800
    click_button 'Create RFA Application'
    first_name = 'Dillonish'
    last_name = 'Wisozkish'
    fill_in('applicants[0].first_name', with: first_name, match: :prefer_exact)
    fill_in('applicants[0].last_name', with: last_name, match: :prefer_exact)
    click_button('Save Progress')
    visit page.driver.current_url
    expect(page).to have_content "#{first_name} #{last_name}"
    click_link("#{first_name} #{last_name}")
    expect(page).to have_button('Submit', disabled: true)
  end

  scenario 'validate submit enabled functionality', set_auth_header: true do
    visit root_path
    page.driver.browser.manage.window.resize_to 1200, 800
    click_button 'Create RFA Application'
    fill_in('applicants[0].first_name', with: 'Geovanni', match: :prefer_exact)
    expect(page).to have_button('Save Progress', disabled: true)
    expect(page).to have_button('Submit', disabled: true)
    fill_in('applicants[0].last_name', with: 'Moen', match: :prefer_exact)
    expect(page).to have_button('Save Progress', disabled: false)
    expect(page).to have_button('Submit', disabled: true)
    fill_in('applicants[0].date_of_birth', with: '11/11/1990', match: :prefer_exact)
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
    click_button('Save Progress')
    visit page.driver.current_url
    click_link('Geovanni Moen')
    expect(page).to have_button('Submit', disabled: false)
    fill_in('applicant_first_name', with: 'first name', match: :prefer_exact)
    fill_in('applicant_last_name', with: 'last name', match: :prefer_exact)
    fill_in('NameOfResourceFamily', with: 'test', match: :prefer_exact)
    fill_in('date_of_birth', with: '11/11/1999', match: :prefer_exact)
    fill_in('Residentialstreet_address', with: '2870 something else', match: :prefer_exact)
    fill_in('Residentialzip', with: '12345', match: :prefer_exact)
    fill_in('Residentialcity', with: 'Sacremento', match: :prefer_exact)
    find('#react-select-2--value').click
    find('#react-select-2--option-5').click
    expect(page).to have_button('Submit', disabled: false)
    find('[for=californiaCriminalBackgroundRadiotrue]').click
    expect(page).to have_button('Submit', disabled: true)
    fill_in('californiaCriminalBackgroundoffenseReason', with: 'test offense', match: :prefer_exact)
    fill_in('californiaCriminalBackgroundoffenseCity', with: 'test offense city', match: :prefer_exact)
    fill_in('californiaCriminalBackgroundOffenseDate', with: 'date of offense', match: :prefer_exact)
    fill_in('californiaCriminalBackgroundoffenseDetails', with: 'offense details', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: false)
    find('[for=crimeBackgroundAgainstCohabitantRadiotrue').click
    expect(page).to have_button('Submit', disabled: true)
    fill_in('crimeBackgroundAgainstCohabitantoffenseReason', with: 'cohab test offense', match: :prefer_exact)
    fill_in('crimeBackgroundAgainstCohabitantoffenseCity', with: 'cohab test offense city', match: :prefer_exact)
    fill_in('crimeBackgroundAgainstCohabitantOffenseDate', with: 'cohab date of offense', match: :prefer_exact)
    fill_in('crimeBackgroundAgainstCohabitantoffenseDetails', with: 'cohab offense details', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: false)
    find('[for=outsideCACriminalBackgroundtrue').click
    expect(page).to have_button('Submit', disabled: true)
    fill_in('outsideCaliforniaCriminalBackgroundoffenseReason', with: 'outside test offense', match: :prefer_exact)
    fill_in('outsideCaliforniaCriminalBackgroundoffenseCity', with: 'outside test offense city', match: :prefer_exact)
    fill_in('outsideCaliforniaCriminalBackgroundOffenseDate', with: 'outside date of offense', match: :prefer_exact)
    fill_in('outsideCaliforniaCriminalBackgroundoffenseDetails', with: 'outside offense details', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: false)
    click_button 'Submit'
    expect(page).not_to have_content('an exception occured: form-submission-validation')
    sleep(3.seconds)
    visit page.driver.current_url
    expect(page).to have_button('Submit', disabled: true)
    fill_in('applicant_first_name', with: 'G', match: :prefer_exact)
    expect(page).to have_button('Submit', disabled: true)
  end
end
