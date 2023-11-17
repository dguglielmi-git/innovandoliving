import React, { useState, useEffect } from 'react'
import { Image, Icon } from 'semantic-ui-react'
import { getConfigurations } from '../../api/configurations'
import { PATH_LOGO_IMG } from '../../utils/constants'
import { useRouter } from 'next/router'

export default function Footer () {
  const [configs, setConfigs] = useState({})
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const setConfigurations = async () => {
    const conf = await getConfigurations()
    setConfigs(conf)
  }
  useEffect(() => {
    setLoading(true)
    setConfigurations()
    setLoading(false)
  }, [])

  const goTo = url => router.push(url)

  if (loading) return null

  const DivItem = ({ icon, func }) => (
    <div className='footer-page__links-item' onClick={() => goTo(func || '#')}>
      <Icon name={icon} size='big' />
    </div>
  )

  return (
    <div className='footer-page'>
      <div className='footer-page__links'>
        <DivItem icon='facebook' func={configs?.facebook_url || ''} />
        <DivItem icon='instagram' func={configs?.instagram_url || ''} />
        <DivItem icon='whatsapp' func={configs?.whatsapp_num || ''} />
        <DivItem icon='mail' func={configs?.mail_url || ''} />
      </div>
      <div className='footer-page__logo'>
        <Image src={`/${PATH_LOGO_IMG}`} alt='logo' size='tiny' />
      </div>
      <div className='footer-page__text'>
        <h4>{configs?.footer_text || '-'}</h4>
      </div>
    </div>
  )
}
