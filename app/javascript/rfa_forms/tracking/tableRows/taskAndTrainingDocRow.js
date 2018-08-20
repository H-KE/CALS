import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {BinarySelectorField} from 'components/common/binarySelectorField'
import {DateField} from 'components/common/dateFields'
import {TextAreaComponent} from 'components/common/textArea'
import {FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'

const taskAndTrainingDocRow = ({
  trackingDocuments,
  editMode,
  handleChange
}) => {
  return (
    editMode
      ? trackingDocuments.items.map((docs, index) => {
        return (
          <tr key={'taskAndTrainingEdit' + index}>
            <td><BinarySelectorField
              id={'taskAndTrainingEditCheckbox' + index}
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
                id={'taskAndTrainingEditCompletedDate' + index}
                value={FormatDateForDisplay(docs.completed_date)}
                onChange={(event) => handleChange('completed_date', FormatDateForPersistance(event.target.value), index)} />
            </td>
            <td>
              <TextAreaComponent
                id={'taskAndTrainingEditNotes' + index}
                value={docs.notes}
                onChange={(event) => handleChange('notes', event.target.value, index)} />
            </td>
          </tr>
        )
      })

      : trackingDocuments.items.map((docs, index) => {
        return (
          <tr key={'taskAndTrainingShow' + index}>
            <td><BinarySelectorField
              id={'taskAndTrainingShowCheckbox' + index}
              type='checkbox'
              key={index}
              labelId={'checkLabel' + index}
              label={docs.title}
              gridClassName='col-xs-12 align-row'
              defaultChecked={docs.checked} />
            </td>
            <td />
            <td id={'taskAndTrainingShowCompletedDate' + index}>
              {FormatDateForDisplay(docs.completed_date)}
            </td>
            <td id={'taskAndTrainingShowNotes' + index}>
              {docs.notes}
            </td>
          </tr>
        )
      })
  )
}

taskAndTrainingDocRow.defaultProps = {
  trackingDocuments: {
    'notes': '',
    'title': '',
    'checked': false,
    'completed_date': ''
  }
}
export default taskAndTrainingDocRow
