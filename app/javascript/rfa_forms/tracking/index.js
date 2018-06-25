import React from 'react'
import Immutable from 'immutable'
import TrackingDocument from './trackingDocument'
import CardsGroupLayout from 'components/common/cardsGroupLayout.js'
import Button from 'components/common/button'
import LogoHeader from 'components/common/logoHeader'
import PageHeader from 'components/common/pageHeader'
import BreadCrumb from 'components/common/breadCrumb'
import TrackingButtons from 'components/common/pageHeaderButtons/trackingButtons'
import TrackingSideBar from './trackingSideBar'
import {urlPrefixHelper} from 'helpers/url_prefix_helper.js.erb'
import {fetchRequest} from 'helpers/http'

export default class TrackingList extends React.Component {
  constructor (props) {
    super(props)
    this.saveProgress = this.saveProgress.bind(this)
    this.editProgress = this.editProgress.bind(this)
    this.cancelProgress = this.cancelProgress.bind(this)
    this.setApplicationState = this.setApplicationState.bind(this)

    this.state = {
      user: this.props.user,
      rfaApplication: this.props.rfaApplication,
      tracking: this.props.tracking,
      cardBeingEdited: false
    }
  }

  editProgress (event) {
    this.setState({ cardBeingEdited: true })
  }

  cancelProgress (event) {
    this.setState({ cardBeingEdited: false })
    this.setState({tracking: this.props.tracking})
  }

  saveProgress (event) {
    this.setState({ cardBeingEdited: false })
    const url = '/rfa/a01/' + this.state.rfaApplication.id + '/tracking/' + this.state.tracking.id
    fetchRequest(url, 'PUT', this.state.tracking)
      .then((response) => {
        return response.json()
      }).catch((errors) => {
        this.setState({
          errors: errors
        })
      })
  }

  setApplicationState (key, value) {
    let newState = Immutable.fromJS(this.state)
    newState = newState.setIn(['tracking', 'tracking_documents', 'facility_documents', key], value)
    this.setState(newState.toJS())
  }

  render () {
    const trackingDocuments = this.state.tracking.tracking_documents
    const facilityName = this.state.tracking.facility_name ? this.state.tracking.facility_name : ''

    return (
      <div className='main_page'>
        <PageHeader
          headerLabel={facilityName + '-RFA Application'}
          pageHeaderButtons={
            <TrackingButtons
              editMode={this.state.cardBeingEdited}
              cancelProgress={this.cancelProgress}
              saveProgress={this.saveProgress}
              editProgress={this.editProgress} />} />
        <BreadCrumb
          navigationElements={[<a href={urlPrefixHelper('/')}>RFA Application list</a>]} />
        <div className='form-section col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <div className='left-content col-xs-3 col-sm-3 col-md-3 col-lg-3'>
            <TrackingSideBar
              facilityName={facilityName}
              tracking={trackingDocuments} />
          </div>
          <div className='col-xs-9 col-sm-9 col-md-9 col-lg-9'>
            <TrackingDocument
              facilityName={facilityName}
              setParentState={this.setApplicationState}
              trackingDocuments={trackingDocuments}
              editMode={this.state.cardBeingEdited} />
          </div>
        </div>
      </div>
    )
  }
}

TrackingList.defaultProps = {
  tracking: {},
  rfaApplication: {}
}
