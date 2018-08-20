import React from 'react'
import ContactsListCard from 'contacts/contacts_list/ContactsListCard.jsx'
import {shallow, mount} from 'enzyme'

describe('Verify ContactsListCard component', () => {
  it('Has title', () => {
    const title = 'TestTitle'
    const wrapper = shallow(<ContactsListCard title={title} />)
    let titleWrapper = wrapper.find('.contacts-list-title')
    expect(1).toEqual(titleWrapper.length)
    expect(titleWrapper.text()).toEqual(title)
  })

  it('Does not have title', () => {
    const wrapper = shallow(<ContactsListCard />)
    expect(0).toEqual(wrapper.find('.contacts-list-title').length)
  })

  it('Shows no contacts message', () => {
    const wrapper = shallow(<ContactsListCard />)
    expect(1).toEqual(wrapper.find('.no-contacts').length)
    expect(0).toEqual(wrapper.find('ContactsTable').length)
  })

  it('Shows contacts table', () => {
    const wrapper = shallow(<ContactsListCard contacts={contactsData} />)
    expect(0).toEqual(wrapper.find('.no-contacts').length)
    expect(1).toEqual(wrapper.find('ContactsTable').length)
  })

  it('Calls create new contact function', () => {
    let createContactSpy = jasmine.createSpy('createContact')
    const wrapper = shallow(<ContactsListCard onClickCreateContact={createContactSpy} />)
    wrapper.find('.btn-create-contact').simulate('click')
    expect(createContactSpy).toHaveBeenCalled()
  })
})

const contactsData = [
  {
    id: 1,
    date: '2018-01-31',
    classification: {
      id: 1,
      value: 'Confidential'
    },
    contact_method: {
      id: 1,
      value: 'In Person'
    },
    in_person_contact_data: {
      location: {
        id: 2,
        value: 'Home/Facility'
      },
      notice: true,
      is_collateral_visit: true,
      collateral_visit_start_time: '15:20:00',
      collateral_visit_end_time: '16:20:00',
      visit_type: {
        id: 1,
        value: 'Emergency Placement Assessment'
      }
    },
    title: 'Title here'
  }
]
