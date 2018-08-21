import React from 'react'
import FacilitySectionView from 'facility/common/facilitySectionView'
import {shallow, mount} from 'enzyme'

describe('Verify Facility Assigned Worker', function () {
  const props = {
    label1: 'LICENSING / APPROVAL WORKER',
    label2: 'LICENSING / APPROVAL WORKER PHONE NUMBER',
    label3: 'LICENSING / APPROVAL WORKER EMAIL',
    value1: 'Ananya Nandi',
    value2: '(945) 432-1234',
    value3: 'email@gmail.com'
  }
  let AssignedWorkerCompShallow = shallow(<FacilitySectionView {...props} />)
  it('verify Facility Assigned Worker', () => {
    expect(AssignedWorkerCompShallow.find('.facility-address').length).toEqual(1)
  })
  it('verify Facility Assigned Worker Full Name', () => {
    expect(AssignedWorkerCompShallow.find('SmallInnerBlockDetails[title="LICENSING / APPROVAL WORKER"]').props().value).toBe('Ananya Nandi')
  })
  it('verify Facility Assigned Worker Phone Number', () => {
    expect(AssignedWorkerCompShallow.find('SmallInnerBlockDetails[title="LICENSING / APPROVAL WORKER PHONE NUMBER"]').props().value).toBe('(945) 432-1234')
  })
  it('verify Facility Assigned Worker Email', () => {
    expect(AssignedWorkerCompShallow.find('SmallInnerBlockDetails[title="LICENSING / APPROVAL WORKER EMAIL"]').props().value).toBe('email@gmail.com')
  })
})

describe('Verify Facility Capacity block', function () {
  const props = {
    label1: 'CAPACITY',
    label2: 'AVAILABLE BEDS',
    label3: 'CAPACITY LAST CHANGED',
    value1: 0,
    value2: 0,
    value3: '12/12/2O12'
  }
  let FacilityCapacityCompShallow = shallow(<FacilitySectionView {...props} />)
  it('verify Facility Capacity', () => {
    expect(FacilityCapacityCompShallow.find('SmallInnerBlockDetails[title="CAPACITY"]').props().value).toBe(0)
  })
  it('verify Facility Available beds', () => {
    expect(FacilityCapacityCompShallow.find('SmallInnerBlockDetails[title="AVAILABLE BEDS"]').props().value).toBe(0)
  })
  it('verify Facility Capacity last changed', () => {
    expect(FacilityCapacityCompShallow.find('SmallInnerBlockDetails[title="CAPACITY LAST CHANGED"]').props().value).toBe('12/12/2O12')
  })
})
