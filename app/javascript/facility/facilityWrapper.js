import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FacilityDetails from 'facility/facilityDetails'
import FacilityAddress from 'facility/facilityAddress'
import Spinner from 'facility/common/spinner'
import FacilitySectionView from 'facility/common/facilitySectionView'

class FacilityWrapper extends React.Component {
  componentDidMount () {
    const params = {
      id: this.props.match.params.facility_id
    }
    this.props.facilityApiCall(params)
  }

  render () {
    const {
      facilityData,
      facilityAddress,
      facilityName,
      facilityPhones,
      otherFacilityData,
      facilityAssignedWorker,
      isFetching,
      errors
    } = this.props
    return (
      <div>
        {isFetching ? (
          <Spinner/>
        ) : (
          <div>
            <FacilityDetails
              facilityData={facilityData}
              facilityName={facilityName}
              errors={errors}
            />
            <FacilitySectionView
              label1='CAPACITY'
              label2='AVAILABLE BEDS'
              label3='CAPACITY LAST CHANGED'
              value1={facilityData.capacity}
              value2={facilityData.available_beds}
              value3={facilityData.capacity_last_changed}
            />
            <FacilityAddress
              facilityAddress={facilityAddress}
              facilityPhones={facilityPhones}
              otherFacilityData={otherFacilityData}
            />
            <FacilitySectionView
              label1='LICENSING / APPROVAL WORKER'
              label2='LICENSING / APPROVAL WORKER PHONE NUMBER'
              label3='LICENSING / APPROVAL WORKER EMAIL'
              value1={facilityAssignedWorker.assignedWorkerFullName}
              value2={facilityAssignedWorker.assignedWorkerPhoneNumber}
              value3={facilityAssignedWorker.assignedWorkerEmail}
            />
          </div>
        )}
      </div>
    )
  }
}

FacilityWrapper.propTypes = {
  match: PropTypes.object,
  facilityApiCall: PropTypes.func,
  isFetching: PropTypes.bool,
  facilityData: PropTypes.object,
  facilityAddress: PropTypes.object,
  facilityPhones: PropTypes.object,
  otherFacilityData: PropTypes.object,
  errors: PropTypes.object
}

FacilityWrapper.defaultProps = {
  match: {
    params: {
      id: ''
    }
  },
  facilityData: {
    capacity: 'N/A',
    available_beds: 'N/A',
    capacity_last_changed: ''
  },
  facilityAssignedWorker: {
    assignedWorkerFullName: '',
    assignedWorkerPhoneNumber: '',
    assignedWorkerEmail: ''
  }
}

export default FacilityWrapper
