import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {BinarySelectorField} from 'components/common/binarySelectorField'
import {DateField} from 'components/common/dateFields'
import {TextAreaComponent} from 'components/common/textArea'
import {FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'

const FamilyDocRow = ({
  trackingDocuments,
  editMode,
  handleChange
}) => {
  return (
    editMode
      ? trackingDocuments.items.map((docs, index) => {
        return (
          <tr key={'familyEdit' + index}>
            <td><BinarySelectorField
              id={'familyEditCheckbox' + index}
              type='checkbox'
              key={index}
              labelId={'checkLabel' + index}
              label={docs.title}
              gridClassName='col-xs-12 align-row'
              onChange={(event) => handleChange('checked', event.target.checked, index)}
              defaultChecked={docs.checked}
            />
            </td>
            <td />
            <td>
              <DateField
                id={'familyEditRecievedDate' + index}
                value={FormatDateForDisplay(docs.received_date)}
                onChange={(event) => handleChange('received_date', FormatDateForPersistance(event.target.value), index)} />
            </td>
            <td>
              <TextAreaComponent
                id={'familyEditNotes' + index}
                value={docs.notes}
                onChange={(event) => handleChange('notes', event.target.value, index)} />
            </td>
          </tr>
        )
      })
      : trackingDocuments.items.map((docs, index) => {
        return (
          <tr key={'familyShow' + index}>
            <td><BinarySelectorField
              id={'familyShowCheckbox' + index}
              type='checkbox'
              key={index}
              labelId={'checkLabel' + index}
              label={docs.title}
              gridClassName='col-xs-12 align-row'
              defaultChecked={docs.checked} />
            </td>
            <td />
            <td id={'familyShowRecievedDate' + index}>
              {FormatDateForDisplay(docs.received_date)}
            </td>
            <td id={'familyShowNotes' + index}>
              {docs.notes}
            </td>
          </tr>
        )
      })
  )
}

FamilyDocRow.defaultProps = {
  trackingDocuments: {
    'notes': '',
    'title': '',
    'checked': false,
    'received_date': ''
  }
}
export default FamilyDocRow
