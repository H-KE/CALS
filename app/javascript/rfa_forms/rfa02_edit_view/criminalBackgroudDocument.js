import React from 'react'
import PropTypes from 'prop-types'
import EmergencyPlacement from './emergencyPlacement'
import LiveScan from './liveScan'
import OtherResources from './otherResources'
import InterCountyTransfer from './interCountyTransfer'
import Exemptions from './exemptions'
import OutOfStateRegistryCheck from './outOfStateRegistryCheck'
import ScrollSpy from 'components/common/scrollSpy'

export default class CriminalBackgroudDocument extends React.Component {
  constructor (props) {
    super(props)
    this.setParentState = this.setParentState.bind(this)
  }
  setParentState (key, value, index) {
    let people = this.props.people
    let peopleObj = people.setIn([index, 'background_check', key], value)
    this.props.setState('people', peopleObj)
  }
  render () {
    const peopleList = this.props.people
    return (
      peopleList.map((person, index) => {
        const hrefId = person.toJS().person_type.replace(/\s+/g, '') + index + '-tracking-card'
        const backGroundCheckDocs = person.get('background_check')
        return (
          <div key={index} className='rfa-tracking col-xs-12'>
            <ScrollSpy onEnter={() => this.props.handleHrefClick('#' + hrefId)}>
              <div className='tracking-card' id={hrefId}>
                <div className='tracking-card row'>
                  <div className={'tracking-card-header people_documents'}>
                    <h3>{person.get('person_type') + ': ' + person.get('person_name') + ' Criminal Background Checklist'}</h3>
                  </div>
                  <div className='tracking-table'>
                    <EmergencyPlacement
                      peopleIndex={index}
                      setParentState={this.setParentState}
                      emergencyPlacementList={backGroundCheckDocs.get('emergency_placement_only')}
                      editMode={this.props.editMode} />
                    <LiveScan
                      peopleIndex={index}
                      id='liveScan'
                      setParentState={this.setParentState}
                      liveScanList={backGroundCheckDocs.get('live_scan')}
                      editMode={this.props.editMode} />
                    <OtherResources
                      peopleIndex={index}
                      setParentState={this.setParentState}
                      otherResourcesList={backGroundCheckDocs.get('other_resources')}
                      editMode={this.props.editMode} />
                    <InterCountyTransfer
                      peopleIndex={index}
                      setParentState={this.setParentState}
                      countyTrasferList={backGroundCheckDocs.get('inter_county_transfer')}
                      editMode={this.props.editMode} />
                    <Exemptions
                      peopleIndex={index}
                      setParentState={this.setParentState}
                      exemptionList={backGroundCheckDocs.get('exemptions')}
                      editMode={this.props.editMode} />
                    <OutOfStateRegistryCheck
                      peopleIndex={index}
                      setParentState={this.setParentState}
                      outOfStateRegistryList={backGroundCheckDocs.get('out_of_state_registry_checklist')}
                      editMode={this.props.editMode} />
                  </div>
                </div>
              </div>
            </ScrollSpy>
          </div>
        )
      }))
  }
}

CriminalBackgroudDocument.defaultProps = {
  people: []
}
