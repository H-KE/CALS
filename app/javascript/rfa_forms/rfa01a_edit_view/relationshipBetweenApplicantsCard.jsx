import React from 'react'
import Immutable from 'immutable'
import RelationshipBetweenApplicantsFields from './relationshipBetweenApplicantsFields'
import {getFocusClassName} from 'helpers/cardsHelper.jsx'

const blankValues = Object.freeze({
  relationship_type: {
    id: 0,
    value: ''
  },
  date_of_relationship: '',
  place_of_relationship_city: '',
  place_of_relationship_state: {
    id: 0,
    value: ''
  }
})

export default class RelationshipBetweenApplicantsCard extends React.Component {
  constructor (props) {
    super(props)
    this.setState = this.setState.bind(this)
  }

  setState (key, value) {
    let newData = Immutable.fromJS(this.props.relationshipBetweenApplicants || blankValues)
    newData = newData.set(key, value)
    this.props.setParentState('relationshipBetweenApplicants', newData.toJS())
  }

  render () {
    let data = this.props.relationshipBetweenApplicants || blankValues

    return (
      <div className='relationship_between_applicants_card'>
        <div id='RelationshipBetweenApplicantsCardSection' onClick={() => this.props.setFocusState('RelationshipBetweenApplicantsCard')}
          className={this.props.getFocusClassName('RelationshipBetweenApplicantsCard') + ' ' + 'card phone-section double-gap-top'}>
          <div className='card-header'><span>Relationships</span></div>
          <div className='card-body'>
            <div className='row'>
              <RelationshipBetweenApplicantsFields
                relationshipBetweenApplicants={this.props.relationshipBetweenApplicants}
                relationshipTypes={this.props.relationshipTypes}
                RelationshipBetweenApplicantsCardSection={data}
                applicants={this.props.applicants}
                stateTypes={this.props.stateTypes}
                setParentState={this.setState}
                validator={this.props.validator}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
