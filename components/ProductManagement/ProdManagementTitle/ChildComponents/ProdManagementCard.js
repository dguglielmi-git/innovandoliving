import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ProdManagementCard ({
  icon,
  label,
  value,
  iconColor = 'gray'
}) {
  return (
    <div className='prodmanagement-title__cards-box__card'>
      <div className='prodmanagement-title__cards-box__card__icon'>
        <FontAwesomeIcon icon={icon} size='2x' color={iconColor} />
      </div>
      <div className='prodmanagement-title__cards-box__card__labels'>
        <div className='prodmanagement-title__cards-box__card__labels__title'>
          <h4 className='poppins-600-regular'>{label}</h4>
        </div>
        <div className='prodmanagement-title__cards-box__card__labels__value'>
          <h4 className='poppins-600-regular'>{value}</h4>
        </div>
      </div>
    </div>
  )
}
