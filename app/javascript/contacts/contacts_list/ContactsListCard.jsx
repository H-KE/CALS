import React, { Fragment } from 'react'
import ContactsTable from './ContactsTable'

export default class ContactsListCard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contacts: props.contacts
    }
  }

  render () {
    let title
    let contactsListContent
    if (this.state.contacts && this.state.contacts.length > 0) {
      contactsListContent = <ContactsTable contacts={this.state.contacts} />
    } else {
      contactsListContent = (
        <div className='no-contacts text-center pad-top'>
          <h4>No Contacts recorded</h4>
          Summary of Contacts will display here once at least one Contact has been created.
        </div>
      )
    }
    if (this.props.title) {
      title = <div className='card-header contacts-list-title'><span>{this.props.title}</span></div>
    } else {
      title = <Fragment />
    }
    return (
      <div className='ContactsListCard'>
        <div id='ContactsListCard' className='card double-gap-top active-bar'>
          {title}
          <div className='card-body'>
            <div id='ContactsTable' className='pad-top'>
              {contactsListContent}
              <div className='text-right'>
                <button onClick={this.props.onClickCreateContact} className='btn btn-default btn-create-contact'>+ CREATE NEW CONTACT</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
