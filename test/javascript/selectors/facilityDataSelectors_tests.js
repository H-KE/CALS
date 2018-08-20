import {
  getFacilityData,
  getFacilityChildren,
  getFacilityComplaints,
  getFacilityAddresses,
  getFacilityPhones,
  getFacilityName,
  getOtherFacilityData,
  getFacilityAssignedWorker
} from 'selectors/facilityDataSelectors'
describe('facilityDataSelectors', () => {
  describe('getFacilityDataSelector', () => {
    it('should return undefined when passed in null', () => {
      const state = {
        facilityReducer: {
          facility: null
        }
      }
      expect(getFacilityData(state)).toEqual(undefined)
    })
    it('should return facility object', () => {
      const state = {
        facilityReducer: {
          facility: {
            'href': 'facilities/100000299',
            'id': '100000299',
            'type': {
              'id': '6',
              'value': 'Foster Family Home'
            },
            'name': 'Little Dreams Home',
            'licensee_name': 'Ananya Nandi',
            'license_type': 'A',
            'assigned_worker': {
              'full_name': 'Ananya Nandi'
            },
            'capacity': 0,
            'available_beds': 0,
            'district_office': {
              'number': '19',
              'name': 'PACIFIC INLAND CR'
            },
            'license_number': '100000299',
            'status': {
              'id': '7',
              'value': 'APPLICATION WITHDRWN'
            },
            'county': {
              'id': '33',
              'value': 'RIVERSIDE'
            },
            'phones': [{
              'relation': 'primary',
              'type': 'Cell',
              'number': '9162990000'
            }],
            'addresses': [{
              'type': 'Residential',
              'address': {
                'street_address': '123 Main St.',
                'state': 'CA'
              }
            }, {
              'type': 'Mailing',
              'address': {
                'state': 'CA'
              }
            }],
            'facility_source': 'LIS'
          }
        }
      }
      expect(getFacilityData(state)).toEqual({
        capacity: 0,
        capacity_last_changed: 'N/A',
        available_beds: 0,
        district_office: 'PACIFIC INLAND CR',
        licensee_name: 'Ananya Nandi',
        license_number: '100000299',
        license_effective_date: 'N/A',
        original_application_recieved_date: 'N/A',
        type: 'Foster Family Home',
        status: 'APPLICATION WITHDRWN'
      })
    })
  })
  describe('getFacilityAddressesSelector', () => {
    it('should return address attributes with N/A when passed in null', () => {
      const state = {
        facilityReducer: {
          facility: {
            addresses: null
          }
        }
      }
      expect(getFacilityAddresses(state)).toEqual({
        physicalStreetAddress: 'N/A',
        physicalAddressCityZipState: 'N/A',
        mailingStreetAddress: 'N/A',
        mailingAddressCityZipState: 'N/A'
      })
    })
    it('should return facility Addresses', () => {
      const state = {
        facilityReducer: {
          facility: {
            addresses: [ {
              'type': 'Residential',
              'address': {
                'street_address': '3186 Wild Horse Court',
                'city': 'Thousand Oaks',
                'state': 'CA',
                'zip_code': '91360'
              }
            } ]
          }
        }
      }
      expect(getFacilityAddresses(state)).toEqual({
        physicalStreetAddress: '3186 Wild Horse Court,',
        physicalAddressCityZipState: 'Thousand Oaks, CA 91360',
        mailingStreetAddress: 'N/A',
        mailingAddressCityZipState: 'N/A'
      })
    })
  })
  describe('getFacilityPhonesSelector', () => {
    it('should return phone attributes with N/A when passed in null', () => {
      const state = {
        facilityReducer: {
          facility: {
            phones: null
          }
        }
      }
      expect(getFacilityPhones(state)).toEqual({
        primaryPhoneNumber: 'N/A',
        alternativePhoneNumber: 'N/A'
      })
    })
    it('should return facility phones', () => {
      const state = {
        facilityReducer: {
          facility: {
            phones: [ {
              'relation': 'primary',
              'number': '8054926944'
            }, {
              'relation': 'alternate',
              'number': '8054926944'
            } ]
          }
        }
      }
      expect(getFacilityPhones(state)).toEqual({
        primaryPhoneNumber: '(805) 492-6944',
        alternativePhoneNumber: '(805) 492-6944'
      })
    })
  })
  describe('getFacilityNameSelector', () => {
    it('should return N/A when passed in null', () => {
      const state = {
        facilityReducer: {
          facility: {
            name: null
          }
        }
      }
      expect(getFacilityName(state)).toEqual('N/A')
    })
    it('should return facility name', () => {
      const state = {
        facilityReducer: {
          facility: {
            name: 'Claire Dale'
          }
        }
      }
      expect(getFacilityName(state)).toEqual('Claire Dale')
    })
  })
  describe('getFacilityOtherDataSelector', () => {
    it('should return other attributes with N/A when passed in null', () => {
      const state = {
        facilityReducer: {
          facility: {}
        }
      }
      expect(getOtherFacilityData(state)).toEqual({
        county: 'N/A',
        lastVisitDate: 'N/A',
        lastVisitReason: 'N/A'
      })
    })
    it('should return other facility data', () => {
      const state = {
        facilityReducer: {
          facility: {
            county: {
              id: '56',
              value: 'Ventura'
            },
            last_visit_date: '12/22/2222',
            last_visit_reason: 'Something'
          }
        }
      }
      expect(getOtherFacilityData(state)).toEqual({
        county: 'Ventura',
        lastVisitDate: '12/22/2222',
        lastVisitReason: 'N/A'
      })
    })
  })
  describe('getFacilityAssignedWorkerSelector', () => {
    it('should return other attributes with N/A when passed in null', () => {
      const state = {
        facilityReducer: {
          facility: {}
        }
      }
      expect(getFacilityAssignedWorker(state)).toEqual({
        assignedWorkerFullName: 'N/A',
        assignedWorkerPhoneNumber: 'N/A',
        assignedWorkerEmail: 'N/A'
      })
    })
    it('should return assigned worker data', () => {
      const state = {
        facilityReducer: {
          facility: {
            assigned_worker: {
              'full_name': 'Ananya Nandi',
              'phones': [
                {
                  'relation': 'primary',
                  'number': '9164578228'
                },
                {
                  'relation': 'alternate',
                  'number': '9164578228'
                }
              ],
              'email': 'email@gmail.com'
            }
          }
        }
      }
      expect(getFacilityAssignedWorker(state)).toEqual({
        assignedWorkerFullName: 'Ananya Nandi',
        assignedWorkerPhoneNumber: '(916) 457-8228',
        assignedWorkerEmail: 'email@gmail.com'
      })
    })
  })

  describe('getChildrenDataSelector', () => {
    it('should return empty array when passed in null', () => {
      const state = {
        facilityChildren: {
          'children': []
        }
      }
      expect(getFacilityChildren(state)).toEqual([])
    })
    it('should return children array', () => {
      const state = {
        facilityChildren: {
          'children': [{
            'id': '2q6FdWU03k',
            'person': {
              'gender': 'M',
              'age': 29,
              'first_name': 'boy F',
              'last_name': 'Cavy',
              'date_of_birth': '1988-08-08'
            },
            'date_of_placement': '1998-08-04',
            'assigned_worker': {
              'first_name': 'Wayne',
              'last_name': 'Fehlberg'
            },
            'county_of_origin': 'Modoc',
            'display_client_id': '0161-3317-6329-8000232'
          }]
        }
      }
      expect(getFacilityChildren(state)).toEqual([{
        age: 29,
        assigned_worker: 'Wayne Fehlberg',
        county_of_origin: 'Modoc',
        date_of_birth: '08/08/1988',
        date_of_placement: '08/04/1998',
        display_client_id: '0161-3317-6329-8000232',
        first_name: 'boy F',
        gender: 'M',
        id: '2q6FdWU03k',
        last_name: 'Cavy'
      }]
      )
    })
    it('should return children array with N/A values', () => {
      const state = {
        facilityChildren: {
          'children': [{
            'id': '2q6FdWU03k',
            'person': {
              'gender': 'M',
              'age': 29,
              'first_name': 'boy F',
              'last_name': 'Cavy'
            },
            'display_client_id': '0161-3317-6329-8000232'
          }]
        }
      }
      expect(getFacilityChildren(state)).toEqual([{
        age: 29,
        assigned_worker: 'N/A',
        county_of_origin: 'N/A',
        date_of_birth: 'N/A',
        date_of_placement: 'N/A',
        display_client_id: '0161-3317-6329-8000232',
        first_name: 'boy F',
        gender: 'M',
        id: '2q6FdWU03k',
        last_name: 'Cavy'
      }]
      )
    })
  })
  describe('getComplaintsDataSelector', () => {
    it('should return null when passed in null', () => {
      const state = {
        facilityComplaints: {
          complaints: null
        }
      }
      expect(getFacilityComplaints(state)).toEqual(undefined)
    })
    it('should return complaints array', () => {
      const state = {
        facilityComplaints: {
          'complaints': [{
            'id': '19-CR-195002-20041019105945',
            'complaint_date': '2004-10-19 00:00:00',
            'assigned_worker': 'Saritha Reddy',
            'control_number': '198952',
            'status': 'Approved',
            'pre_investigation_comments': 'PO Zamora not in today - contact made with Janice Featherston as described above.',
            'post_investigation_comments': 'Left message on her voicemail informing her of the outcome of the investigation.',
            'contact_summary': 'Assigned to LPA Jeffers.\r\nComplaint originally written on 10/15/04, under the wrong Olive Crest home.  LPA Jeffers re-wrote the complaint under the same control #.\r\n"10-day" visit completed 10/21/04.\r\nInterviews conducted with the 3 clients in placement at the time, with the staff alleged to be the perpetrator.',
            'followup_comments': 'None at this time.',
            'allegations': [{
              'complaint_type_code': '10',
              'complaint_type_description': 'Neglect/Lack of Supervision',
              'allegation': 'Staff Meena Desai marks clients Alexzena Webb and Dizirea Goodwin with a ballpoint pen while they are sleeping.',
              'resolution_type_code': 'U',
              'resolution_type_description': 'Unsubstantiated'
            }]
          }]
        }
      }
      expect(getFacilityComplaints(state)).toEqual(
        [{
          approval_date: 'N/A',
          assigned_worker: 'Saritha Reddy',
          complaint_date: '10/19/2004',
          control_number: '198952',
          priority_level: 'N/A',
          status: 'Approved',
          allegations: [{
            'index_subcomponent': '1.',
            'type_code': '10 - Neglect/Lack of Supervision',
            'allegation': 'Staff Meena Desai marks clients Alexzena Webb and Dizirea Goodwin with a ballpoint pen while they are sleeping.',
            'resolution_type_description': 'Unsubstantiated'
          }]
        }]
      )
    })
  })
})
