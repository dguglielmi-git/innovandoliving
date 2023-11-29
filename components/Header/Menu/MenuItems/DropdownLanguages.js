import React from 'react'
import { map } from 'lodash'
import { Dropdown } from 'semantic-ui-react'
import ReactCountryFlag from 'react-country-flag'
import { Typography } from '@material-ui/core'

export default function DropdownLanguages (props) {
  const { onClick, languages, languageSelected } = props

  const dropDownStyles = {
    width: '1.5em',
    height: '1.5em'
  }

  return (
    <Dropdown
      icon={
        <ReactCountryFlag
          countryCode={languageSelected?.flag}
          svg
          style={dropDownStyles}
        />
      }
      pointing='top left'
    >
      <Dropdown.Menu>
        <div className='languages-box'>
          {map(languages.resources, (lang, index) => (
            <div
              className='lang-list'
              onClick={() => {
                onClick(lang)
              }}
              key={index}
            >
              <ReactCountryFlag
                countryCode={lang.flag}
                svg
                style={dropDownStyles}
              />
              <div className='lang-list__text'>
                <Typography variant='subtitle2'>{lang.text}</Typography>
              </div>
            </div>
          ))}
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}
