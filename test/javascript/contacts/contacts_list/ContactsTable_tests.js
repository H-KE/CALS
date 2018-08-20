import React from 'react'
import ContactsTable from 'contacts/contacts_list/ContactsTable.jsx'
import {mount} from 'enzyme'

describe('Verify ContactsTable component', () => {
  const contacts = [
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
    },
    {
      id: 2,
      date: '2018-02-28',
      classification: {
        id: 1,
        value: 'Confidential'
      },
      contact_method: {
        id: 2,
        value: 'Telephone'
      },
      title: 'Title here 2 long string long string long string long string long string '
    },
    {
      id: 3,
      date: '2018-03-31',
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
      title: 'Title here 3'
    },
    {
      id: 4,
      date: '2018-03-31',
      classification: {
        id: 1,
        value: 'Confidential'
      },
      contact_method: {
        id: 3,
        value: 'Email'
      },
      title: 'Title here 3'
    }
  ]

  it('To have empty table when the contacts prop is undefined', () => {
    const undefinedProps = {}
    const contactsTable = mount(<ContactsTable {...undefinedProps} />)
    expect(1).toEqual(contactsTable.find('ReactTable').length)
    expect(4).toEqual(contactsTable.find('ThComponent').length)
    expect(0).toEqual(contactsTable.find('.contacts-td').length)
  })
  it('To have empty table when the contacts prop is empty array', () => {
    const emptyContactsProps = {
      contacts: []
    }
    const contactsTable = mount(<ContactsTable {...emptyContactsProps} />)
    expect(1).toEqual(contactsTable.find('ReactTable').length)
    expect(4).toEqual(contactsTable.find('ThComponent').length)
    expect(0).toEqual(contactsTable.find('.contacts-td').length)
  })
  it('To have table with data', () => {
    const props = {
      contacts: contacts
    }
    const contactsTable = mount(<ContactsTable {...props} />)
    expect(4 * 4).toEqual(contactsTable.find('TdComponent').length)
  })
})
