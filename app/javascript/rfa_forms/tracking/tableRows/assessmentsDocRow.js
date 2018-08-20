import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import {BinarySelectorField} from 'components/common/binarySelectorField'
import {DateField} from 'components/common/dateFields'
import {TextAreaComponent} from 'components/common/textArea'
import {FormatDateForDisplay, FormatDateForPersistance} from 'helpers/commonHelper.jsx'

const AssessmentsDocRow = ({
  trackingDocuments,
  editMode,
  handleChange
}) => {
  return (
    editMode
      ? trackingDocuments.items.map((docs, index) => {
        return (
          <tr key={'assessmentEdit' + index}>
            <td><BinarySelectorField
              id={'assessmentEditCheckbox' + index}
              type='checkbox'
              key={index}
              labelId={'checkLabel' + index}
              label={docs.title}
              gridClassName='col-xs-12 align-row'
              onChange={(event) => handleChange('checked', event.target.checked, index)}
              defaultChecked={docs.checked}
            />
            </td>
            <td>
              <DateField
                id={'assessmentEditSubmittedDate' + index}
                value={FormatDateForDisplay(docs.submitted_date)}
                onChange={(event) => handleChange('submitted_date', FormatDateForPersistance(event.target.value), index)} />
            </td>
            <td>
              <DateField
                id={'assessmentEditApprovedDate' + index}
                value={FormatDateForDisplay(docs.approved_date)}
                onChange={(event) => handleChange('approved_date', FormatDateForPersistance(event.target.value), index)} />

            </td>
            <td>
              <TextAreaComponent
                id={'assessmentEditText' + index}
                value={docs.notes}
                onChange={(event) => handleChange('notes', event.target.value, index)} />
            </td>
          </tr>
        )
      })
      : trackingDocuments.items.map((docs, index) => {
        return (
          <tr key={'assessmentShow' + index}>
            <td id={'assessmentShowCheckbox' + index}>
              <BinarySelectorField
                type='checkbox'
                key={index}
                labelId={'checkLabel' + index}
                label={docs.title}
                gridClassName='col-xs-12 align-row'
                defaultChecked={docs.checked} />
            </td>
            <td id={'assessmentShowSubmittedDate' + index}>
              {FormatDateForDisplay(docs.submitted_date)}
            </td>
            <td id={'assessmentShowApprovedDate' + index}>
              {FormatDateForDisplay(docs.approved_date)}
            </td>
            <td id={'assessmentShowText' + index}>
              {docs.notes}
            </td>
          </tr>
        )
      })
  )
}

AssessmentsDocRow.defaultProps = {
  trackingDocuments: {
    'notes': '',
    'title': '',
    'checked': false,
    'approved_date': '',
    'submitted_date': ''}
}
export default AssessmentsDocRow
