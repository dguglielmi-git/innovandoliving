import React, { useState } from 'react'
import { ListBox } from 'primereact/listbox'
import { Menubar } from 'primereact/menubar'

export default function Category() {
  const [selectedCity, setSelectedCity] = useState(null)
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ]

  const items = [
    {
      label: 'Add',
      icon: 'pi pi-fw pi-plus-circle',
    },
    {
      label: 'Edit',
      icon: 'pi pi-fw pi-pencil',
    },
    {
      label: 'Remove',
      icon: 'pi pi-fw pi-trash',
    },
  ]

  return (
    <div className="category-management">
      <div className="category-management__title">
        <h2>Categories</h2>
      </div>
      <div className="category-management__list">
        <Menubar model={items} />
        <div className="card flex justify-content-center">
          <ListBox
            filter
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.value)}
            options={cities}
            optionLabel="name"
            className="w-full md:w-14rem"
          />
        </div>
      </div>
    </div>
  )
}
