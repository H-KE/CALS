import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import TrackingTableWithEditShow from './trackingTableWithEditShow'

export default class TrackPeopleDocs extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange (key, value) {
    let personDocuments = this.props.peopleDocument.get('person_documents')
    let newPersonDocuments = personDocuments.set(key, value)
    this.props.setPeopleDocuments('person_documents', newPersonDocuments, this.props.index)
  }
  render () {
    const personDocuments = this.props.peopleDocument.get('person_documents')
    return (
      <div>
        <div className='tracking-card-header'>
          <h3>{this.props.tableTitle + ':' + ' ' + this.props.personName + ' '+ 'RFA Documents'}</h3>
        </div>
        <TrackingTableWithEditShow
          colHeaders={['individual Documents', 'Started', 'Completed', 'Notes']}
          personDocuments={personDocuments.getIn(['individual_documents', 'items'])}
          tableName='individual_documents'
          tableType={this.props.tableTitle + 'individual_documents'}
          editMode={this.props.editMode}
          handleChange={this.handleChange}
        />
        <TrackingTableWithEditShow
          colHeaders={['Clearances', 'Started', 'Completed', 'Notes']}
          personDocuments={personDocuments.getIn(['clearances', 'items'])}
          editMode={this.props.editMode}
          tableName='clearances'
          tableType={this.props.tableTitle + 'Clearances'}
          handleChange={this.handleChange}
        />
      </div>
    )
  }
}

