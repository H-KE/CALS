import React from 'react'
import Moment from 'moment'

export const respectiveStreetAddressOrNA = (addresses, addressType) => {
  const addressObject = addresses && addresses.find(o => o.type === addressType)
  if (addressObject && addressObject.address.street_address) {
    return addressObject.address.street_address + ','
  } else {
    return 'N/A'
  }
}

export const cityStateZipOfRespectiveAddressOrNA = (addresses, addressType) => {
  const addressObject = addresses && addresses.find(o => o.type === addressType)
  if (addressObject) {
    const cityStateString = checkForValueOrBlank(addressObject.address.city) + ', ' + checkForValueOrBlank(addressObject.address.state) + ' ' + checkForValueOrBlank(addressObject.address.zip_code)
    return cityStateString === ',  ' ? '' : cityStateString
  } else {
    return 'N/A'
  }
}

export const checkForValueOrBlank = (value) => {
  return value || ''
}

export const checkForValue = (value) => {
  return value || undefined
}

export const checkAndSplitValue = (value) => {
  if (value !== undefined || '') {
    const filteredSet = ['*', '']
    return value.split(' ').filter((val) => !filteredSet.includes(val)).map((val) => '*' + val + '*').join(' ')
  }
}

export const getArrayOfId = (array) => {
  if (array && array.length > 0) {
    return array.map((e) => (e.id))
  }
}

export const checkForLicenseStatus = (isAllActive, statusValue) => {
  return isAllActive ? '' : getArrayOfId(statusValue)
}

export const respectiveNumberOrNA = (phones, phoneRelation) => {
  const phoneObject = phones && phones.find(o => o.relation === phoneRelation)
  if (phoneObject && Boolean(phoneObject.number)) {
    return formatPhoneNumberForDashes(phoneObject.number)
  } else {
    return 'N/A'
  }
}

export const respectiveFullAddressOrNA = (addresses, addressType) => {
  const addressObject = addresses && addresses.find(o => o.type === addressType)
  if (addressObject) {
    const stringForFullAddress = checkForValueOrBlank(addressObject.address.street_address) + ', ' + checkForValueOrBlank(addressObject.address.city) + ', ' + checkForValueOrBlank(addressObject.address.state) + ' ' + checkForValueOrBlank(addressObject.address.zip_code)
    return stringForFullAddress === ', ,  ' ? '' : stringForFullAddress
  } else {
    return 'N/A'
  }
}

export const checkforDateOrNa = (date) => {
  if (date) {
    return date.split(' ')[0].replace(/(\d{4})-(\d{2})-(\d{2})/, '$2/$3/$1')
  } else {
    return 'N/A'
  }
}

export const sortbyDate = (a, b) => {
  const dateA = new Date(a).getTime()
  const dateB = new Date(b).getTime()
  return dateA > dateB ? 1 : -1
}

export const formatPhoneNumberForDashes = (phone) => {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
}

export const checkForNA = (object) => {
  return (object && object.value) ? object.value : 'N/A'
}

export const checkForObjectAndValue = (object, key) => {
  return (object && object[key]) ? object[key] : 'N/A'
}

export const checkNameorNA = (object) => {
  return (object && object.name) ? object.name : 'N/A'
}

export const checkPhoneNumberOrNA = (object, objectPhoneNumberRelation) => {
  return object ? respectiveNumberOrNA(object.phones, objectPhoneNumberRelation) : 'N/A'
}

export const checkfullNameorNA = (object) => {
  return object ? `${object.first_name} ${object.last_name}` : 'N/A'
}

export const checkNullOrEmptyValue = (value) => {
  return (value === null || value === '') ? 'N/A' : value
}

export const primaryPhoneRelation = 'primary'

export const alternativePhoneRelation = 'alternate'

export const physicalAddressType = 'Residential'

export const mailingAddressType = 'Mailing'

export const listOfStatus = ['LICENSED', 'CERTIFIED/APPROVED', 'LICENSED(PENDING CAPACITY CHANGE)']

export const resultsPerPage = ['5', '10', '25', '50', '100']

export const NoSearchResultsErrorMessage = 'No results were found with the selected search criteria, please refine your search criteria and try again.'

export const NoSearchCriteriaMessage = 'Please select search criteria and try again.'

export const handleLicenseEffectiveDate = (result) => {
  if (result.status) {
    return listOfStatus.indexOf(result.status.value) >= 0 ? checkforDateOrNa(result.license_effective_date) : 'N/A'
  } else {
    return 'N/A'
  }
}

export const defaultDateFormat = 'MM/DD/YYYY'

export const formatDate = (date, format) => { return Moment(date).local().format(format || defaultDateFormat) }
