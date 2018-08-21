import React from 'react'
import ReactTable from 'react-table'
import {urlPrefixHelper} from 'helpers/url_prefix_helper.js.erb'
import {sortbyDate, formatDate} from 'search/common/commonUtils'

export default class ContactsTable extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      contacts: props.contacts
    }
  }

  render () {
    const {contacts} = this.state
    return (
      <ReactTable
        className={'contacts-table'}
        data={contacts}
        columns={columns}
        defaultPageSize={contacts.length}
        showPagination={false}
        sortable={true}
        resizable={false}
        noDataText=''
        defaultSorted={[
          {
            id: 'date',
            desc: true
          }
        ]}
      />
    )
  }
}

const columns = [
  {
    Header: h => <span> Date <i className='fa fa-unsorted' /></span>,
    headerClassName: 'contacts-th',
    id: 'date',
    accessor: d => { return formatDate(d.date) },
    maxWidth: 100,
    className: 'contacts-td',
    sortMethod: (a, b) => sortbyDate(a, b)
  },
  {
    Header: h => <span> Method of Contacts <i className='fa fa-unsorted' /></span>,
    headerClassName: 'contacts-th',
    id: 'contact_method',
    accessor: 'contact_method.value',
    maxWidth: 160,
    className: 'contacts-td'
  },
  {
    Header: h => <span> Type <i className='fa fa-unsorted' /></span>,
    headerClassName: 'contacts-th',
    id: 'in_person_contact_data',
    accessor: 'in_person_contact_data.visit_type.value',
    maxWidth: 150,
    className: 'contacts-td'
  },
  {
    Header: 'Title',
    headerClassName: 'contacts-th',
    id: 'contact',
    sortable: false,
    accessor: d => d,
    maxWidth: 600,
    className: 'contacts-td',
    Cell: row => (<a href={urlPrefixHelper('/contacts/' + row.value.id + '/edit')}>{row.value.title}</a>)
  }
]

ContactsTable.defaultProps = {
  contacts: []
}
