import React, { useState } from 'react'

export default function Category () {
  return (
    <div className='category-management'>
      <div className='category-management__mainbox'>
        <div className='category-management__mainbox__title'>
          <h2 className='poppins-600-regular'>Categories</h2>
        </div>
        <div className='category-management__mainbox__list'>
          <div className='category-management__mainbox__list__headers'>
            <div className='category-management__mainbox__list__headers__label'>
              <h2 className='poppins-600-regular'>Category Title</h2>
            </div>
            <div className='category-management__mainbox__list__headers__label'>
              <h2 className='poppins-600-regular'>Options</h2>
            </div>
          </div>
          <div className='category-management__mainbox__list__rows'></div>
          <div className='category-management__mainbox__list__actions'></div>
        </div>
      </div>
    </div>
  )
}
