import React from 'react'
import Immutable from 'immutable'
import CardsGroupLayout from 'components/common/cardsGroupLayout.js'
import {urlPrefixHelper} from 'helpers/url_prefix_helper.js.erb'
import PageHeader from 'components/common/pageHeader'
import ContactsListCard from 'contacts/contacts_list/ContactsListCard'

export default class Profile extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: this.props.user,
      rfa_application: this.props.rfa_application.id,
      tracking: this.props.rfa_application.tracking_id,
      contacts: this.props.contacts
    }
  }

  render () {
    const trackingId = this.props.rfa_application.tracking_id
    const rfaApplication = this.state.rfa_application
    const createContactUrl = urlPrefixHelper('/rfa/a01/' + rfaApplication + '/contact')
    let trackingUrl = trackingId
      ? urlPrefixHelper('/rfa/a01/' + rfaApplication + '/tracking/' + trackingId + '/edit')
      : urlPrefixHelper('/rfa/a01/' + rfaApplication + '/tracking/')
    return (
      <div className='profile-main-page'>
        <PageHeader headerLabel={rfaApplication.facility_name + ' Facility Profile'} />
        <div className='container'>
          <div className='row'>
            <div className='form-section col-xs-12 col-sm-12 col-md-12 col-lg-12'>
              <div className='left-content col-xs-3 col-sm-3 col-md-3 col-lg-3'>
                Sidebar here
              </div>
              <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
                <div id='tracking-card' className='cards-section col-xs-12 col-sm-12 col-md-12 col-lg-12' >
                  <div className='col-md-8'><a href={trackingUrl}>tracking link</a></div>
                </div>
                <div id='contacts-card' className='cards-section col-xs-12 col-sm-12 col-md-12 col-lg-12' >
                  <ContactsListCard
                    title={'Contacts'}
                    contacts={this.state.contacts}
                    onClickCreateContact={() => { window.location.href = createContactUrl }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
