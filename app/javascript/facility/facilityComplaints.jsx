import React from 'react'
import PropTypes from 'prop-types'
import ReactTable from 'react-table'
import ApiErrorMessages from 'components/common/errors/apiErrorMessages'
import Spinner from 'facility/common/spinner'
import {complaintsColumns, allegationColumns} from 'facility/common/reactTableHeaders'

export default class FacilityComplaints extends React.Component {
  componentDidMount () {
    const params = {
      'id': this.props.match.params.facility_id
    }
    this.props.facilityComplaintsApiCall(params)
  }

  render () {
    const {complaints, errors, isFetching} = this.props
    return (
      <div className='facility-children'>
        <div className='facility-children-block col-xs-12 col-sm-12 col-md-12 col-lg-12'>
          <div className='children-title'> <h3>Complaint History </h3> </div>
          <ApiErrorMessages errors={errors.issue_details}/>
          {isFetching
            ? <Spinner/>
            : <ReactTable
              id='facility-complaints-table'
              className='table'
              data={complaints}
              columns={complaintsColumns}
              defaultPageSize={complaints.length}
              showPagination={false}
              sortable={false}
              resizable={false}
              noDataText=''
              SubComponent={row => {
                return (
                  <div className='sub-component' >
                    <ReactTable
                      data={row.original.allegations}
                      columns={allegationColumns}
                      defaultPageSize={row.original.allegations.length}
                      sortable={true}
                      resizable={false}
                      showPagination={false}
                    />
                  </div>
                )
              }
              }
            />
          }
        </div>
      </div>
    )
  }
}

FacilityComplaints.propTypes = {
  complaints: PropTypes.array,
  errors: PropTypes.object,
  match: PropTypes.object
}

FacilityComplaints.defaultProps = {
  complaints: [],
  match: {
    params: {
      id: ''
    }
  },
  errors: {
    issue_details: undefined
  }
}
