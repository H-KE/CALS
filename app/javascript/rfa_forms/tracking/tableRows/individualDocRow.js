import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {BinarySelectorField} from 'components/common/binarySelectorField'
import {DateField} from 'components/common/dateFields'
import {TextAreaComponent} from 'components/common/textArea'
import {FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'

const IndividualDocRow = ({
  individualDocuments,
  peopleIndex,
  editMode,
  handleChange
}) => {
  return (
    editMode
      ? individualDocuments.items.map((peopleDoc, itemIndex) => {
        return (
          <tr key={'individual' + peopleIndex + 'Edit' + itemIndex}>
            <td><BinarySelectorField
              id={'individual' + peopleIndex + 'EditCheckbox' + itemIndex}
              type='checkbox'
              key={itemIndex}
              labelId={'checkLabel' + itemIndex}
              label={peopleDoc.title}
              gridClassName='col-xs-12 align-row'
              onChange={(event) => handleChange('checked', event.target.checked, peopleIndex, itemIndex)}
              defaultChecked={peopleDoc.checked}
            />
            </td>
            <td>
              <DateField
                id={'individual' + peopleIndex + 'EditStartDate' + itemIndex}
                value={FormatDateForDisplay(peopleDoc.start_date)}
                onChange={(event) => handleChange('start_date', FormatDateForPersistance(event.target.value), peopleIndex, itemIndex)} />

            </td>

            <td>
              <DateField
                id={'individual' + peopleIndex + 'EditApprovedDate' + itemIndex}
                value={FormatDateForDisplay(peopleDoc.completed_date)}
                onChange={(event) => handleChange('completed_date', FormatDateForPersistance(event.target.value), peopleIndex, itemIndex)} />
            </td>
            <td>
              <TextAreaComponent
                id={'individual' + peopleIndex + 'EditText' + itemIndex}
                value={peopleDoc.notes}
                onChange={(event) => handleChange('notes', event.target.value, peopleIndex, itemIndex)} />
            </td>
          </tr>
        )
      })
      : individualDocuments.items.map((peopleDoc, index) => {
        return (
          <tr key={'individual' + peopleIndex + 'Show' + index}>
            <td>
              <BinarySelectorField
                id={'individual' + peopleIndex + 'ShowCheckbox' + index}
                type='checkbox'
                key={index}
                labelId={'checkLabel' + index}
                label={peopleDoc.title}
                gridClassName='col-xs-12 align-row'
                defaultChecked={peopleDoc.checked} />
            </td>
            <td id={'individual' + peopleIndex + 'showStartDate' + index}>
              {FormatDateForDisplay(peopleDoc.start_date)}
            </td>
            <td id={'individual' + peopleIndex + 'ShowApprovedDate' + index}>
              {FormatDateForDisplay(peopleDoc.completed_date)}
            </td>
            <td id={'individual' + peopleIndex + 'ShowText' + index}>
              {peopleDoc.notes}
            </td>
          </tr>
        )
      })
  )
}

IndividualDocRow.defaultProps = {
  individualDocuments: {
    'notes': '',
    'title': '',
    'checked': false,
    'start_date': '',
    'completed_date': ''
  }
}

export default IndividualDocRow
