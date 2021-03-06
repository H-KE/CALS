import React from 'react'

const BinarySelectorField = ({gridClassName, defaultChecked, type, label, id, value, checked, disabled, onChange, labelId}) => (
  <div className={gridClassName}>
    <input
      type={type}
      id={id}
      value={value}
      label={label}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={onChange} />
    <label htmlFor={id} id={labelId}>{label}</label>
  </div>
)
BinarySelectorField.defaultProps = {
  type: 'checkbox'
}
export {BinarySelectorField}
