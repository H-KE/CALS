import React from 'react'
import FacilityDetails from 'facility/facilityDetails.jsx'
import {shallow} from 'enzyme'

describe('Verify Facility Details', function () {
  const props = {
    facilityData: {
      'href': 'facilities/300665437',
      'id': '300665437',
      'licensee_name': 'Lederhouse Transitions Inc.',
      'district_office': 'PACIFIC INLAND CR',
      'license_number': '300665437',
      'status': 'LICENSED',
      'capacity': 10,
      'capacity_last_changed': '10/01/2012',
      'license_effective_date': '10/01/2012',
      'original_application_recieved_date': '07/18/2012'
    },
    facilityName: 'Ananya Nandi'
  }
  let detailsCompShallow = shallow(<FacilityDetails {...props} />)
  it('verify Facility Details fields', function () {
    expect(detailsCompShallow.find('.facility-details').length).toEqual(1)
  })
  it('Verify Facility Name', function () {
    expect(detailsCompShallow.find('SmallInnerBlockDetails[title="FACILITY / HOME NAME"]').props().value).toBe('Ananya Nandi')
  })
  it('Verify Name of Licensee / Parents', function () {
    expect(detailsCompShallow.find('SmallInnerBlockDetails[title="NAME OF LICENSEE / PARENTS"]').props().value).toBe('Lederhouse Transitions Inc.')
  })
  it('Verify Assigned Oversight agency', function () {
    expect(detailsCompShallow.find('SmallInnerBlockDetails[title="ASSIGNED OVERSIGHT AGENCY"]').props().value).toBe('PACIFIC INLAND CR')
  })
  it('Verify Facility License Number', function () {
    expect(detailsCompShallow.find('SmallInnerBlockDetails[title="LICENSE NUMBER / FAMILY ID"]').props().value).toBe('300665437')
  })
  it('Verify License status', function () {
    expect(detailsCompShallow.find('SmallInnerBlockDetails[title="STATUS"]').props().value).toBe('LICENSED')
  })
  it('Verify License Effective Date when license status is "Licensed"', function () {
    expect(detailsCompShallow.find('SmallInnerBlockDetails[title="LICENSE / APPROVAL EFFECTIVE DATE"]').props().value).toBe('10/01/2012')
  })
  it('Verify Application Received Date', function () {
    expect(detailsCompShallow.find('SmallInnerBlockDetails[title="APPLICATION RECEIVED DATE"]').props().value).toBe('07/18/2012')
  })
})
