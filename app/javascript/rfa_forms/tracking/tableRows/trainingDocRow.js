import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {BinarySelectorField} from 'components/common/binarySelectorField'
import {DateField} from 'components/common/dateFields'
import {TextAreaComponent} from 'components/common/textArea'
import {FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'

const TrainingDocRow = ({
  trainingDocuments,
  peopleIndex,
  editMode,
  handleChange
}) => {
  return (
    editMode
      ? trainingDocuments.items.map((peopleDoc, itemIndex) => {
        return (
          <tr key={'training' + peopleIndex + 'Edit' + itemIndex}>
            <td><BinarySelectorField
              id={'training' + peopleIndex + 'EditCheckbox' + itemIndex}
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
            </td>
            <td>
              <DateField
                id={'training' + peopleIndex + 'EditExpirationDate' + itemIndex}
                value={FormatDateForDisplay(peopleDoc.expiration_date)}
                onChange={(event) => handleChange('expiration_date', FormatDateForPersistance(event.target.value), peopleIndex, itemIndex)} />
            </td>
            <td>
              <TextAreaComponent
                id={'training' + peopleIndex + 'EditText' + itemIndex}
                value={peopleDoc.notes}
                onChange={(event) => handleChange('notes', event.target.value, peopleIndex, itemIndex)} />
            </td>
          </tr>
        )
      })
      : trainingDocuments.items.map((peopleDoc, index) => {
        return (
          <tr key={'training' + peopleIndex + 'Show' + index}>
            <td id={'training' + peopleIndex + 'ShowCheckbox' + index}>
              <BinarySelectorField
                id={'trainingShowCheckbox' + index}
                type='checkbox'
                key={index}
                labelId={'checkLabel' + index}
                label={peopleDoc.title}
                gridClassName='col-xs-12 align-row'
                defaultChecked={peopleDoc.checked} />
            </td>
            <td />
            <td id={'training' + peopleIndex + 'ShowExpirationDate' + index}>
              {FormatDateForDisplay(peopleDoc.expiration_date)}
            </td>
            <td id={'training' + peopleIndex + 'ShowText' + index}>
              {peopleDoc.notes}
            </td>
          </tr>
        )
      })
  )
}

TrainingDocRow.defaultProps = {
  trackingDocuments: {
    'notes': '',
    'title': '',
    'checked': false,
    'expiration_date': ''
  }
}

export default TrainingDocRow
