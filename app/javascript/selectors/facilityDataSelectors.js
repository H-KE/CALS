import {
  checkForNA,
  checkForObjectAndValue,
  checkforDateOrNa,
  checkfullNameorNA,
  checkPhoneNumberOrNA,
  checkNameorNA,
  handleLicenseEffectiveDate,
  cityStateZipOfRespectiveAddressOrNA,
  respectiveNumberOrNA,
  respectiveStreetAddressOrNA,
  primaryPhoneRelation,
  alternativePhoneRelation,
  physicalAddressType,
  mailingAddressType
} from 'search/common/commonUtils'

const facilitySelector = (state) => state.facilityReducer.facility

const facilityChildrenSelector = (state) => state.facilityChildren.children

const facilityComplaintsSelector = (state) => state.facilityComplaints.complaints

const getAddressesOfFacility = (addresses) => ({
  physicalStreetAddress: respectiveStreetAddressOrNA(addresses, physicalAddressType),
  physicalAddressCityZipState: cityStateZipOfRespectiveAddressOrNA(addresses, physicalAddressType),
  mailingStreetAddress: respectiveStreetAddressOrNA(addresses, mailingAddressType),
  mailingAddressCityZipState: cityStateZipOfRespectiveAddressOrNA(addresses, mailingAddressType)
})

const getPhonesOfFacility = (phones) => ({
  primaryPhoneNumber: respectiveNumberOrNA(phones, primaryPhoneRelation),
  alternativePhoneNumber: respectiveNumberOrNA(phones, alternativePhoneRelation)
})

const getOtherDataOfFacility = (facilityState) => ({
  county: checkForNA(facilityState.county),
  lastVisitDate: checkforDateOrNa(facilityState.last_visit_date),
  lastVisitReason: checkForNA(facilityState.last_visit_reason)
})

const getAssignedWorkerData = (assignedWorker) => ({
  assignedWorkerFullName: checkForObjectAndValue(assignedWorker, 'full_name'),
  assignedWorkerPhoneNumber: checkPhoneNumberOrNA(assignedWorker, primaryPhoneRelation),
  assignedWorkerEmail: checkForObjectAndValue(assignedWorker, 'email')
})

const getFacilityDetails = (facilityState) => ({
  available_beds: facilityState.available_beds,
  capacity: facilityState.capacity,
  capacity_last_changed: checkforDateOrNa(facilityState.capacity_last_changed),
  district_office: checkNameorNA(facilityState.district_office),
  licensee_name: facilityState.licensee_name || 'N/A',
  license_number: facilityState.license_number || 'N/A',
  license_effective_date: handleLicenseEffectiveDate(facilityState),
  original_application_recieved_date: checkforDateOrNa(facilityState.original_application_recieved_date),
  type: checkForNA(facilityState.type),
  status: checkForNA(facilityState.status)
})

const getFacilityChildrenData = (facilityChildren) => {
  return facilityChildren.map((child) => ({
    age: child.person.age,
    assigned_worker: checkfullNameorNA(child.assigned_worker),
    county_of_origin: child.county_of_origin || 'N/A',
    date_of_birth: checkforDateOrNa(child.person.date_of_birth),
    date_of_placement: checkforDateOrNa(child.date_of_placement),
    display_client_id: child.display_client_id,
    first_name: child.person.first_name,
    gender: child.person.gender,
    id: child.id,
    last_name: child.person.last_name
  })
  )
}

const getFacilityComplaintsData = (facilityComplaints) => {
  return facilityComplaints.map((complaint) => ({
    approval_date: checkforDateOrNa(complaint.approval_date),
    assigned_worker: complaint.assigned_worker,
    complaint_date: checkforDateOrNa(complaint.complaint_date),
    control_number: complaint.control_number,
    priority_level: complaint.priority_level || 'N/A',
    status: complaint.status,
    allegations: getComplaintAllegations(complaint.allegations)
  })
  )
}

const getComplaintAllegations = (allegations) => {
  return allegations.map((allegation, index) => ({
    index_subcomponent: `${index + 1}.`,
    type_code: `${allegation.complaint_type_code} - ${allegation.complaint_type_description}`,
    allegation: allegation.allegation,
    resolution_type_description: allegation.resolution_type_description
  }))
}

export const getFacilityName = (state) => {
  const facilityState = facilitySelector(state)
  if (facilityState !== null) {
    return facilityState.name || 'N/A'
  }
}

export const getFacilityAssignedWorker = (state) => {
  const facilityState = facilitySelector(state)
  if (facilityState !== null) {
    return getAssignedWorkerData(facilityState.assigned_worker)
  }
}

export const getOtherFacilityData = (state) => {
  const facilityState = facilitySelector(state)
  if (facilityState !== null) {
    return getOtherDataOfFacility(facilityState)
  }
}

export const getFacilityAddresses = (state) => {
  const facilityState = facilitySelector(state)
  if (facilityState !== null) {
    return getAddressesOfFacility(facilityState.addresses)
  }
}

export const getFacilityPhones = (state) => {
  const facilityState = facilitySelector(state)
  if (facilityState !== null) {
    return getPhonesOfFacility(facilityState.phones)
  }
}

export const getFacilityData = (state) => {
  const facilityState = facilitySelector(state)
  if (facilityState !== null) {
    return getFacilityDetails(facilityState)
  }
}

export const getFacilityChildren = (state) => {
  const facilityChildren = facilityChildrenSelector(state)
  if (facilityChildren !== null) {
    return getFacilityChildrenData(facilityChildren)
  }
}

export const getFacilityComplaints = (state) => {
  const facilityComplaints = facilityComplaintsSelector(state)
  if (facilityComplaints !== null) {
    return getFacilityComplaintsData(facilityComplaints)
  }
}
