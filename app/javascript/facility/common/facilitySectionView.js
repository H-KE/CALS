import React from 'react'
import PropTypes from 'prop-types'
import {SmallInnerBlockDetails} from 'facility/smallInnerBlockDetails.js'

const FacilitySectionView = ({
  label1,
  label2,
  label3,
  value1,
  value2,
  value3
}) => (
  <div className='facility-address'>
    <div className='facility-address-block col-xs-12 col-sm-12 col-md-12 col-lg-12'>
      <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
        <div className='inner_block'>
          <SmallInnerBlockDetails
            title={label1}
            value={value1} />
        </div>
      </div>
      <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
        <div className='inner_block'>
          <SmallInnerBlockDetails
            title={label2}
            value={value2} />
        </div>
      </div>
      <div className='col-xs-12 col-sm-4 col-md-4 col-lg-4'>
        <div className='inner_block'>
          <SmallInnerBlockDetails
            title={label3}
            value={value3} />
        </div>
      </div>
    </div>
  </div>
)

FacilitySectionView.propTypes = {
  label1: PropTypes.string,
  label2: PropTypes.string,
  label3: PropTypes.string,
  value1: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value2: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  value3: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

FacilitySectionView.defaultProps = {
  value1: 'N/A',
  value2: 'N/A',
  value3: 'N/A'
}

export default FacilitySectionView
